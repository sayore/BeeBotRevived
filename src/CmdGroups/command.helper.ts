import * as Discord from 'discord.js';
import { Logging } from 'supernode/Base/Logging';
import { Item } from 'supernode/Game/Item';
import { ItemStack } from 'supernode/Game/ItemStack';
import { db } from '../app';
import { DBHelper } from '../db.helper';
import { ICommand } from "./icommands";
import { clientBee, clientBob } from "../app";
import _, { startsWith } from "lodash";
import { Userdata } from '../Helper/user';
import { report } from 'process';

export class ResultReport {

    private start: number;
    private noConsoleLog = false;
    constructor(
        public executed: boolean,
        public halting = false,
        public scanned: number = 0,
        public executedNum: number = 0,
        public matchedNum: number = 0) {
        this.start = Date.now();
    }

    add(resrep: ResultReport) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        this.noConsoleLog = resrep.noConsoleLog || this.noConsoleLog;
        this.matchedNum += resrep.matchedNum;
        return this;
    }
    setNoConsoleLog() { this.noConsoleLog = true; return this; }
    setExecuted(arg0: boolean) { this.executed = arg0; return this; }
    addScanned(arg0: number) { this.scanned += arg0; return this; }
    addExecuted(isHalting: boolean = false) {
        this.executed = true;
        this.executedNum++;
        this.halting = isHalting || this.halting;
        return this;
    }
    report() {
        if (!this.noConsoleLog)
            Logging.log(`Scanned ${this.scanned} commands. ${this.matchedNum} matched and executed ${this.executedNum}. (Took ${Date.now() - this.start}ms) ${(this.halting ? "Halted" : "")}`, "Reporter")
    }
}

export async function SimplePerRules(cmds: ICommand[], msg: Discord.Message, user: Userdata, reports: ResultReport = new ResultReport(false, false, 0, 0, 0)): Promise<ResultReport> {
    //let report = { executed: (reports?reports.executedNum:0), errors: [], halting: (reports?reports.executed:false) }

    // This is Bee himself
    if (msg.author.id == clientBee.user.id || msg.author.id == clientBob.user.id) {
        return reports.setNoConsoleLog();
    }

    // If any command wants to halt now, do it.
    reports.addScanned(cmds.length);
    if (reports) if (reports.halting) return reports;


    //Check that conditionals are met, then execute the cmd.
    for await (const v of cmds) {
        reports.matchedNum += 1;
        if (!!v.userlimitedids) {
            if (v.userlimitedids.indexOf(msg.author.id) == -1) { continue; }
        } //This checks for privelege for the command on a per user basis
        //Logging.log(JSON.stringify(v)) 

        if (v.ownerlimited != undefined) {
            if (v.ownerlimited == true && msg.guild.ownerId != msg.author.id) { continue; }
        }

        let exec = async () => {
            // When a command is executed, it can halt the execution of other commands.
            // This is useful for commands like "help" that should be the only thing that executes.
            //
            // Commands are able to either halt by default when they are executed (and the conditions are met for execution),
            // OR they can halt if they return true.
            //
            // Commands that do not return anything will just be executed and not halt. Making them "fire and forget" commands. (Improves performance)
            var halt;
            if(v.canHalt) halt = await v.cmd(msg, (user));
            else { v.cmd(msg, (user)); }

            halt = v.isHalting || halt==true;

            reports.addExecuted(halt);
            if (halt)
                return reports;
            else
                return undefined;
        }

        // If the command has a trigger function, execute it.
        if (v.triggerfunc != undefined && v.triggerfunc(msg)) {
            let res = exec();
            if(res) return await res;
        }

        // If the message is exactly the same as the command, execute it.
        if (v.messagecontent != undefined && (msg.content.toLowerCase() == v.messagecontent.toLowerCase())) {
            let res = exec();
            if(res) return await res;
        }

        // Always Commands are basically helpful for statistics.
        if (v.always == true) {
            let res = exec();
            if(res) return await res;
        }
        
        // If a message contains the words in the triggerwords array, execute it.
        if (v.triggerwords != undefined && v.triggerwords.length >= 1 && CheckForManyWordsCI(msg.content, v.triggerwords)) {
            let res = exec();
            if(res) return await res;
        }
    }

    return reports;
}

export function CheckForManyWords(message: string, words: string[]) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (message.indexOf(word) == -1) { return false; }
    }
    return true;
}

export function CheckForManyWordsCI(message: string, words: string[]) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (message.toLowerCase().indexOf(word) == -1) { return false; }
    }
    return true;
}

export function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getMentions(msgstr: string): string[] {
    let rets = [];
    let safety = 200;
    var idscan = "";
    while (msgstr.includes("<@!")) {
        let pos = msgstr.indexOf("<@!");
        idscan = "";

        do {
            if ("0123456789".includes(msgstr.charAt(pos))) idscan += msgstr.charAt(pos)
            /**console.log(msg.content.charAt(pos))*/
            safety--;
            pos++;
            if (safety == 0) { Logging.log("Needed to break"); break; }
        } while (msgstr.charAt(pos) != ">");

        console.log(idscan);
        msgstr = msgstr.replace("<@!" + idscan + ">", "");
        //msgstr.replace(idscan,"");
        rets.push(idscan);
    }
    while (msgstr.includes("<@")) {
        let pos = msgstr.indexOf("<@");
        idscan = "";

        do {
            if ("0123456789".includes(msgstr.charAt(pos))) idscan += msgstr.charAt(pos)
            /**console.log(msg.content.charAt(pos))*/
            safety--;
            pos++;
            if (safety == 0) { Logging.log("Needed to break"); break; }
        } while (msgstr.charAt(pos) != ">");

        console.log(idscan);
        msgstr = msgstr.replace("<@" + idscan + ">", "");
        //msgstr.replace(idscan,"");
        rets.push(idscan);
    }
    return rets;
}

export async function getAllUsers() : Promise<Userdata[]> {
    return (await db.iterateFilter((v,k) => { return _.startsWith(k,"userj") && !(v as Userdata).extra?.left; })).map(v=>JSON.parse(v)).sort();
}