export let EnvFile = "BeeToken.json";
import { Logging } from 'supernode/Base/Logging';
import { Environment } from 'supernode/Base/Environment';
import process from 'process';
if (!Environment.checkExists(EnvFile)) {
	Environment.save(EnvFile, { envV: 0, beeToken: "NoTokenYet", bobToken: "NoTokenYet" })
	Logging.log("There was no config File yet, it has been written to: " + Environment.getEnvFilePath(EnvFile + "\nBe sure to add the Tokens there."));
	process.exit(-1);
}
let Env = <{ envV: number, beeToken: string, bobToken: string }>Environment.load("BeeToken.json");
if (Env.beeToken == "NoTokenYet") {
	Logging.log("There was a config File yet, but it's missing the Tokens, find it here: " + Environment.getEnvFilePath(EnvFile + "\nBe sure to add the Tokens there."));
	process.exit(-1);
}
import * as Discord from 'discord.js';
import level from 'level-ts';
import { MasterCommands } from './CmdGroups/master';
import { ResultReport, SimplePerRules } from './CmdGroups/command.helper';
import Level from 'level-ts';
import { DBHelper } from './db.helper';
import { EveryoneCommands } from './CmdGroups/everyone';
import { TrustedCommands } from './CmdGroups/trusted';
import { BobCommands } from './CmdGroups/bobjokes';
import { TypeOfApplication, SafetyMode, Application } from 'supernode/Base/Application';
import { ApplicationCollection } from 'supernode/Base/ApplicationCollection';
import { ExpressApplication } from 'supernode/Base/ExpressApplication';

import { RandomEvents } from './CmdGroups/random';
import { MessageHelper } from 'supernode/Discord/mod';


export let clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
export let clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
export let db = new level('./database');
export let randomEvents = new RandomEvents();




async function GenerealReadyAsync(e: Discord.Client) {
	Logging.log(`Logged in as ${e.user.tag}!`);

	let logins = await DBHelper.getCheckd(db, "logins", 1);
	await db.put('logins', ++logins);
	randomEvents.start();
}


class MarrigeHelper{

	jsonObj: any;
	constructor(json:any) {
		this.jsonObj = json;
	}

	addData(uuid:string){

		if(!!this.jsonObj["MarrigeID"]){
			return false;
		}else{
			this.jsonObj.MarrigeID = uuid;
			return this.jsonObj;
		}

	}

}

export class BeeApplication implements Application {
	beeToken: string;
	bobToken: string;
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
	typeOfApplication?: TypeOfApplication;
	needsSafeMode?: SafetyMode;
	meta?: object;

	static hasStarted = false;
	db() { return db; }
	init() {
		BeeApplication.hasStarted = true;
		clientBee.on('ready', GenerealReadyAsync);
		clientBob.on('ready', GenerealReadyAsync);

		clientBee.on('interaction', async interaction => {
			if (!interaction.isCommand()) return;
			if (interaction.commandName === 'ping') {
				await interaction.reply('Pong!');
			}
		});

		clientBee.on('messageCreate', async message => {
			//Logging.log("message..." + (await message.content))
			// Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
			var resFullreport = new ResultReport(false,false,0,0)
			resFullreport.add(SimplePerRules(EveryoneCommands, message));
			resFullreport.add(SimplePerRules(MasterCommands, message))
			resFullreport.add(SimplePerRules(TrustedCommands, message));
	
			resFullreport.report()

			if (message.content.substr(0, 2) === 'b ' && message.member.roles.cache.some((a) => a.id == "854467063677976586")) {
				if (message.content === 'b help') {

				}

				if (message.content === 'b ping') {
					// Send "pong" to the same channel
					const exampleEmbed = new Discord.MessageEmbed()
						//	.setColor('#0099ff')
						.setTitle('Pong!')
					//	.setURL('https://discord.js.org/')
					//	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
					//	.setDescription('Some description here')
					//	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
					//	.addFields(
					//		{ name: 'Regular field title', value: 'Some value here' },
					//		{ name: '\u200B', value: '\u200B' },
					//		{ name: 'Inline field title', value: 'Some value here', inline: true },
					//		{ name: 'Inline field title', value: 'Some value here', inline: true },
					//	)
					//	.addField('Inline field title', 'Some value here', true)
					//	.setImage('https://media1.tenor.com/images/a355767951753e940a3d814b297d3eb3/tenor.gif?itemid=17797226')
					//	.setTimestamp()
					//	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
					let m = await message.channel.send({ embeds: [exampleEmbed] });
				}

				if (message.content.substr(0, 6) === 'b poll') {
					await message.delete();

					let exampleEmbed = new Discord.MessageEmbed()
						.setTitle('Question!')
						.setAuthor(message.member.displayName)
						.setDescription(message.content.substr(7))

					let m = await message.channel.send({ embeds: [exampleEmbed] })

					await m.react('✅')
					await m.react('🔘')
					m.react('❌')
				}
			}
		});

		clientBee.on('interactionCreate', async interaction => {

			if (!interaction.isButton()) return;

			var msg = <Discord.Message>interaction.message; 
			const repliedTo = await msg.channel.messages.fetch(msg.reference.messageId);
			const otherPerson = await repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
			// console.log(msg.mentions);
			// console.log("got here ..");
			var UID = (msg.mentions?.repliedUser?
				(msg.mentions.repliedUser.id?
					msg.mentions.repliedUser.id
					:msg.mentions.repliedUser.tag)
				:"noone?")

			console.log(UID);
			console.log(interaction.user.id);

			if(otherPerson.author.id == interaction.user.id){

				if(interaction.component.customId == "accept"){

					let links = [
						"https://c.tenor.com/gj75w2kkqngAAAAC/tonikaku-kawaii-tonikaku.gif",
						"https://c.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif",
						"https://c.tenor.com/3OYmSePDSVUAAAAC/black-clover-licht.gif"
					]
			
					const exampleEmbed = new Discord.MessageEmbed()
						.setColor('#00FF00')
						.setTitle('Love is in the air!')
						.setDescription(`${MessageHelper.getSendersVisibleName(repliedTo)} is now married to ${MessageHelper.getSendersVisibleName(otherPerson)}.`)
						.setImage(links[Math.floor(Math.random()*links.length)])
					
					var asker = await db.get(`user${repliedTo.author.id}`);
					var recv = await db.get(`user${otherPerson.author.id}`);

					var askObj = new MarrigeHelper(asker);
					var recObj = new MarrigeHelper(recv);

					var newAskData = askObj.addData(otherPerson.author.id);
					var newRecData = recObj.addData(repliedTo.author.id);

					if(newAskData == false || newRecData == false){

						await interaction.reply({content:"user is already married ...", ephemeral: true});
						return;
					}else{

						await db.put(`user${repliedTo.author.id}`, newAskData);
						await db.put(`user${otherPerson.author.id}`, newRecData);

					}
					await msg.edit({embeds:[exampleEmbed], components:[]})

				}else if (interaction.component.customId == "reject"){

					let links = [
						"https://c.tenor.com/lWwk7j4-_QIAAAAC/oreimo-anime.gif"
					]
			
					const exampleEmbed = new Discord.MessageEmbed()
						.setColor('#FF0000')
						.setTitle('Love is not in the air...')
						.setDescription(`${MessageHelper.getSendersVisibleName(otherPerson)} is just rejected ${MessageHelper.getSendersVisibleName(repliedTo)}.....`)
						.setImage(links[Math.floor(Math.random()*links.length)])
					await msg.edit({embeds:[exampleEmbed], components:[]})
				}
				
			}else{
				await interaction.reply({content:"you were not asked", ephemeral: true});
			}


		});

		clientBob.on('messageCreate', async message => {
			SimplePerRules(BobCommands, message);
		});

	}
	async run(eventdata: any) {
		clientBee.login(Env.beeToken);
		clientBob.login(Env.bobToken);
	}
}

export class BeeWebserverApplication extends ExpressApplication {
	subdomain = "bee";
	domain = "sayore.de";
	Type: TypeOfApplication.Express;
	uid = `BeeWebserver (${this.subdomain}.${this.domain})`;
	error?(eventdata?: any): void {

	}
	exit?(eventdata?: any): void {

	}
	needsSafeMode?: SafetyMode = SafetyMode.NeedsCatch;

	init(eventdata?: any): void {
		this.app.get('/', (req, res) => {
			res.send('Hello World!')
		})
	}
	typeOfApplication = TypeOfApplication.Express
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
			new BeeWebserverApplication(80)
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
	}
}, 1200)