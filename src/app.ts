export let EnvFile = "BeeToken.json";
import { Logging, LogLevel, LogTarget } from 'supernode/Base/Logging';
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
import { SimpleReactionsPerRules } from './InteractionReactions/interaction.helper';
import { TestReactions } from './InteractionReactions/testreactions';
import { MarriageReactions } from './InteractionReactions/marriage';
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
Logging.setLogTarget(LogLevel.Unknown , LogTarget.All);
Logging.setLogTarget(LogLevel.Testing , LogTarget.Textfile);



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

	removeData(){  

		if(!!this.jsonObj["MarrigeID"]){
			delete this.jsonObj["MarrigeID"];
			return this.jsonObj;
		}else{
			return false;
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

		clientBee.on('messageCreate', async message => {
			//Logging.log("message..." + (await message.content))
			// Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
			var resFullreport = new ResultReport(false,false,0,0)
			resFullreport=SimplePerRules(EveryoneCommands, message, resFullreport);
			resFullreport.report()
			resFullreport=SimplePerRules(MasterCommands, message, resFullreport);
			resFullreport.report()
			resFullreport=SimplePerRules(TrustedCommands, message, resFullreport);
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

			// 'accept-divorce'
			// 'reject-divorce'
			
			let simpreacts = SimpleReactionsPerRules(TestReactions,interaction,new ResultReport(false,false,0,0));
			if(simpreacts.executed) return;
			simpreacts.add(SimpleReactionsPerRules(MarriageReactions,interaction,new ResultReport(false,false,0,0)))
			simpreacts.report();



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