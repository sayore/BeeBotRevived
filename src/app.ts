export let EnvFile = "BeeToken.json";
import { Logging, LogLevel, LogTarget } from 'supernode/Base/Logging';
import envLoader from "./Helper/config"
export var Env = envLoader(EnvFile);

import * as Discord from 'discord.js';
import level from 'level-ts';
import { MasterCommands } from './CmdGroups/master';
import { ResultReport, SimplePerRules } from './CmdGroups/command.helper';
import { SimpleReactionsPerRules, TestReactions, MarriageReactions } from './InteractionReactions/mod';
import { DBHelper } from './db.helper';

import { EveryoneCommands, TrustedCommands, RandomEvents, RPGCommands,  BobCommands } from './CmdGroups/mod';
import { TypeOfApplication, SafetyMode, Application } from 'supernode/Base/Application';
import { ApplicationCollection } from 'supernode/Base/mod';

import { getUser, setUser } from './Helper/user';

export let clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
export let clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
export let db = new level('./database');
import "./DBUpdates/user-to-jsonuser";

export let randomEvents = new RandomEvents();
Logging.setLogTarget(LogLevel.Unknown , LogTarget.All);
Logging.setLogTarget(LogLevel.Testing , LogTarget.Textfile);

//Gets run by bots per default
async function GenerealReadyAsync(e: Discord.Client) {
	Logging.log(`Logged in as ${e.user.tag}!`);

	let logins = await DBHelper.getCheckd(db, "logins", 1);
	await db.put('logins', ++logins);
	randomEvents.start();

}

//Main Application
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
			var user = await getUser(message.member.id,message);

			var resFullreport = new ResultReport(false,false,0,0)
			//console.log(resFullreport)
			resFullreport=await SimplePerRules(EveryoneCommands, message,user, resFullreport);
			//console.log(resFullreport)
			//resFullreport.report()
			resFullreport=await SimplePerRules(MasterCommands, message,user, resFullreport);
			//console.log(resFullreport)
			//resFullreport.report()
			resFullreport=await SimplePerRules(TrustedCommands, message,user, resFullreport);
			//console.log(resFullreport)
			//resFullreport.report()
			resFullreport=await SimplePerRules(RPGCommands, message,user, resFullreport);
			resFullreport.report()

			await setUser(message.member, user);
		});

		clientBee.on('interactionCreate', async interaction => {
			// Expected:
			// 'accept-divorce'
			// 'reject-divorce'
			let simpreacts = SimpleReactionsPerRules(TestReactions,interaction,new ResultReport(false,false,0,0));
			if(simpreacts.executed) return;
			simpreacts.add(SimpleReactionsPerRules(MarriageReactions,interaction,new ResultReport(false,false,0,0)))
			simpreacts.report();
		});

		clientBob.on('messageCreate', async message => {
			var user = await getUser(message.member.id,message);
			SimplePerRules(BobCommands, message, user);
			//setUser(message.member, user);
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
