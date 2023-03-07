export let EnvFile = "BeeToken.json";
import { Logging, LogLevel, LogTarget } from 'supernode/Base/Logging';
import envLoader from "./Helper/config"
export var Env = envLoader(EnvFile);

import * as Discord from 'discord.js';
import level from 'level-ts';
import { MasterCommands } from './CmdGroups/MasterCommands';
import { ResultReport, SimplePerRules } from './CmdGroups/command.helper';
import { SimpleReactionsPerRules, MarriageReactions } from './InteractionReactions/mod';
import { DBHelper } from './db.helper';

import { EveryoneCommands, TrustedCommands, RandomEvents, RPGCommands,  BobCommands } from './CmdGroups/mod';
import { TypeOfApplication, SafetyMode, Application } from 'supernode/Base/Application';
import { ApplicationCollection } from 'supernode/Base/mod';

import { GuildData } from './Helper/GuildData';

export let clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
export let clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
export let db = new level('./database');
import { Userdata } from './Helper/Userdata';
import { MessageData } from './Helper/MessageData';
import _ from 'lodash';

export let randomEvents = new RandomEvents();
Logging.setLogTarget(LogLevel.Unknown , LogTarget.All);
Logging.setLogTarget(LogLevel.Testing , LogTarget.Textfile);

//Gets run by bots per default
async function GenerealReadyAsync(e: Discord.Client) {
	Logging.log(`Logged in as ${e.user.tag}!`);

	let logins = await DBHelper.getCheckd(db, "logins", 1);
	await db.put('logins', ++logins);
	randomEvents.start();

	let guild = await GuildData.getGuildById("900320264129241119");
	//console.log(guild)
}

//Main Application
export class BeeApplication implements Application {
	beeToken: string;
	bobToken: string;
	typeOfApplication?: TypeOfApplication;
	needsSafeMode?: SafetyMode;
	meta?: object;

	constructor(beeToken: string, bobToken: string) {
		this.beeToken = beeToken;
		this.bobToken = bobToken;
	}

	Type = TypeOfApplication.BackgroundProcess;
	uid = "BeeBot Application";
	error?(eventdata?: any): void {
		Logging.log(eventdata)
	}
	exit?(eventdata?: any): void {
		Logging.log(eventdata)
	}
	
	static hasStarted = false;
	db() { return db; }
	init() {
		BeeApplication.hasStarted = true;
		
		clientBee.on('ready', GenerealReadyAsync);
		clientBob.on('ready', GenerealReadyAsync);

		clientBee.on('guildMemberAdd', async member => {
			try{
				var user = await Userdata.getUser(member.id);
				user.extra.joinedAt = member.joinedAt;
				user.save();
			} catch(e) {
				Logging.log("Error in guildMemberAdd",LogLevel.Report)
			}
			let guild = await GuildData.getGuildById(member.guild.id);

			if(guild.welcomeMessageEnabled) {
				let welcChannel	= await clientBee.channels.fetch(guild.welcomeMessageChannel)
				if(welcChannel.isText()) {
					welcChannel.send(guild.welcomeMessage + " <@!"+member.id+">");
				}
			}
		})

		clientBee.on('messageCreate', async message => {
			var user = await Userdata.getUser(message.member.id,message);
			var guild = await GuildData.getGuildById(message.guildId);

			var resFullreport = new ResultReport(false,false,0,0)
			resFullreport=await SimplePerRules(EveryoneCommands, message,user,guild, resFullreport);
			resFullreport=await SimplePerRules(MasterCommands, message,user,guild, resFullreport);
			resFullreport=await SimplePerRules(TrustedCommands, message,user,guild, resFullreport);
			resFullreport=await SimplePerRules(RPGCommands, message,user,guild, resFullreport);
			resFullreport.report()

			await Userdata.setUser(message.member, user);
		});

		clientBee.on('interactionCreate', async interaction => {
			Logging.log("interaction",LogLevel.Report) 
			SimpleReactionsPerRules(MarriageReactions,interaction,new ResultReport(false,false,0,0)).report();
		});

		clientBee.on('messageReactionAdd', async (reaction, discorduser) => {
			if(discorduser.bot) return;
			if(reaction.partial) {
				try {
					await reaction.fetch();
				} catch (error) {
					Logging.log('Something went wrong when fetching the message: ', error);
					return;
				}
			}
			if(reaction.message.partial) {
				try {
					await reaction.message.fetch();
				} catch (error) {
					Logging.log('Something went wrong when fetching the message: ', error);
					return;
				}
			}
			Logging.log("Trying to add role",LogLevel.Report)
			var user = await Userdata.getUser(discorduser.id);
			var guild = await GuildData.getGuildById(reaction.message.guildId);
			var message = await MessageData.getMessageById(reaction.message.id);

			var reactObj:{emojis:string[],names:string[],message} = _.get(message,"extra.reactRoles");
			if(reactObj == undefined) {
				Logging.log("No reactObj",LogLevel.Report)
				return;
			}
			// Give discorduser the role
			var role = reaction.message.guild.roles.cache.find(role => role.name === reactObj.names[reactObj.emojis.indexOf(reactObj.emojis.find(v=>v.startsWith("<:"+reaction.emoji.name)||v.startsWith(reaction.emoji.name)))]);
			if(role == undefined) { Logging.log("No role found ("+JSON.stringify(reactObj.emojis)+")\n"+reactObj.emojis.find(v=>v.startsWith("<:"+reaction.emoji.name)),LogLevel.Report); return; }
			var member = reaction.message.guild.members.cache.find(member => member.id === discorduser.id);
			if(member == undefined) { Logging.log("No member found",LogLevel.Report); return;}
			member.roles.add(role);
			Logging.log("Added role "+role.name+" to "+member.displayName,LogLevel.Report)
		});

		clientBee.on('messageReactionRemove', async (reaction, discorduser) => {
			if(discorduser.bot) return;
			if(reaction.partial) {
				try {
					await reaction.fetch();
				} catch (error) {
					Logging.log('Something went wrong when fetching the message: ', error);
					return;
				}
			}
			if(reaction.message.partial) {
				try {
					await reaction.message.fetch();
				} catch (error) {
					Logging.log('Something went wrong when fetching the message: ', error);
					return;
				}
			}
			Logging.log("Trying to remove role",LogLevel.Report)
			var user = await Userdata.getUser(discorduser.id);
			var guild = await GuildData.getGuildById(reaction.message.guildId);
			var message = await MessageData.getMessageById(reaction.message.id);

			var reactObj:{emojis:string[],names:string[],message} = _.get(message,"extra.reactRoles");
			if(reactObj == undefined) {
				Logging.log("No reactObj",LogLevel.Report)
				return;
			}
			// Give discorduser the role
			var role = reaction.message.guild.roles.cache.find(role => role.name === reactObj.names[reactObj.emojis.indexOf(reactObj.emojis.find(v=>v.startsWith("<:"+reaction.emoji.name)||v.startsWith(reaction.emoji.name)))]);
			if(role == undefined) { Logging.log("No role found ("+JSON.stringify(reactObj.emojis)+")\n"+reactObj.emojis.find(v=>v.startsWith("<:"+reaction.emoji.name)),LogLevel.Report); return; }
			var member = reaction.message.guild.members.cache.find(member => member.id === discorduser.id);
			if(member == undefined) { Logging.log("No member found",LogLevel.Report); return;}
			member.roles.remove(role);
			Logging.log("Removed role "+role.name+" to "+member.displayName,LogLevel.Report)
		});

		clientBob.on('messageCreate', async message => {
			var user = await Userdata.getUser(message.member.id,message);
			var guild = await GuildData.getGuildById(message.guildId);
			SimplePerRules(BobCommands, message, user, guild);
		});



	}
	async run(eventdata: any) {
		clientBee.login(Env.beeToken);
		clientBob.login(Env.bobToken);
	}
}

export class _BeeBotApps extends ApplicationCollection {
	public beeToken: string;
	public bobToken: string;
	constructor() {
		super()
	}
	init() {
		this.applications = [
			new BeeApplication(Env.beeToken, Env.bobToken),
			//new BeeWebserverApplication(80)
		];
	}
	applications: Application[];
}

export let BeeBotApps: _BeeBotApps = new _BeeBotApps();

/** Autorun if not started externally */
setTimeout(() => {
	if (!BeeApplication.hasStarted) {
		let botApp = new BeeApplication(Env.beeToken, Env.bobToken);
		botApp.init();
		botApp.run({});

		//let beewebApp = new BeeWebserverApplication(80);
		//beewebApp.standalone=true;
		//beewebApp.init();
		//beewebApp.run();
	}
}, 1200)
