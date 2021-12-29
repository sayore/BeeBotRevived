import * as Discord from 'discord.js';
import { Logging } from 'supernode/Base/Logging';
import { Item } from 'supernode/Game/Item';
import { ItemStack } from 'supernode/Game/ItemStack';
import { db } from '../app';
import { DBHelper } from '../db.helper';
import { ICommand } from "./icommands";
import { clientBee, clientBob } from "../app";
import _, { startsWith } from "lodash";
import { getUser, Userdata } from '../Helper/user';
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
    addScanned(arg0: number) { this.scanned = arg0; return this; }
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

export function SimplePerRules(cmds: ICommand[], msg: Discord.Message, user:Userdata, reports: ResultReport = new ResultReport(false, false, 0, 0, 0)): ResultReport {
    //let report = { executed: (reports?reports.executedNum:0), errors: [], halting: (reports?reports.executed:false) }

    // This is Bee himself
    if (msg.author.id == clientBee.user.id || msg.author.id == clientBob.user.id) {
        return reports.setNoConsoleLog();
    }

    // If any command wants to halt now, do it.
    reports.addScanned(cmds.length);
    if (reports) if (reports.halting) return reports;


    //Check that conditionals are met, then execute the cmd.
    cmds.forEach((async v => {
        reports.matchedNum += 1;
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(msg.author.id) == -1) { return; } //This checks for privelege for the command on a per user basis
        //Logging.log(v.userlimitedids)

        if (v.ownerlimited != undefined)
            if (v.ownerlimited == true && msg.guild.ownerId != msg.author.id) { return reports; }

        if (v.messagecontent != undefined)
            if (msg.content.toLowerCase() == v.messagecontent.toLowerCase()) {
                await v.cmd(msg, (user));
                reports.addExecuted(v.isHalting);
                if (v.isHalting)
                    return reports
            }

        if (v.always == true) {
            await v.cmd(msg, (user));
            reports.addExecuted(v.isHalting);
            if (v.isHalting)
                return reports;
        }

        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                await v.cmd(msg, (user));
                reports.addExecuted(v.isHalting);
                if (v.isHalting)
                    return reports;
            }

        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                await v.cmd(msg, (user));
                reports.addExecuted(v.isHalting);

                if (v.isHalting)
                    return reports;
            }
    }))
    
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

export function getMentions(msgstr:string):string[]{
    let rets=[];
    let safety=200;
    var idscan="";
    while(msgstr.includes("<@!")) {
        let pos = msgstr.indexOf("<@!");
        idscan="";

        do {
            if("0123456789".includes(msgstr.charAt(pos))) idscan+=msgstr.charAt(pos)
            /**console.log(msg.content.charAt(pos))*/
            safety--;
            pos++;
            if(safety==0) {Logging.log("Needed to break"); break;}
        } while (msgstr.charAt(pos)!=">");

        console.log(idscan);
        msgstr = msgstr.replace("<@!"+idscan+">","");
        //msgstr.replace(idscan,"");
        rets.push(idscan);
    }
    return rets;
}


export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}