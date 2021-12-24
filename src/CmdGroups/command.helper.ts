import * as Discord from 'discord.js';
import { Logging } from 'supernode/Base/Logging';
import { Item } from 'supernode/Game/Item';
import { ItemStack } from 'supernode/Game/ItemStack';
import { db } from '../app';
import { DBHelper } from '../db.helper';
import { ICommand } from "./icommands";
import { clientBee, clientBob } from "../app";
import _ from "lodash";
import { getUser, Userdata } from '../Helper/user';

export class ResultReport {
    private start:number;
    private noConsoleLog=false;
    constructor(
        public executed: boolean,
        public halting = false,
        public scanned?: number,
        public executedNum?: number) {
        this.start= Date.now();
    }

    add(resrep: ResultReport) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        this.noConsoleLog = resrep.noConsoleLog || this.noConsoleLog;
        return this;
    }
    setNoConsoleLog() {this.noConsoleLog=true;return this;}
    report() {
        if(!this.noConsoleLog)
        Logging.log(`Scanned ${this.scanned} commands. ${this.executedNum} matched and executed(=>${this.executed}). (Took ${Date.now()-this.start}ms)`, "Reporter")
    }
}

export function SimplePerRules(cmds: ICommand[], msg: Discord.Message, reports?: ResultReport): ResultReport {
    let report = { executed: 0, errors: [], halting: false }

    // This is Bee himself
    if (msg.author.id == clientBee.user.id || msg.author.id == clientBob.user.id) { 
        return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed).setNoConsoleLog(); 
    } 

    // If any command wants to halt now, do it.
    if (reports) if (reports.halting) return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);

    //Check that conditionals are met, then execute the cmd.
    cmds.forEach((async v => {
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(msg.author.id) == -1) { return; } //This checks for privelege for the command on a per user basis
        //Logging.log(v.userlimitedids)

        if (v.ownerlimited != undefined)
            if (v.ownerlimited == true && msg.guild.ownerId != msg.author.id) { return; }

        if (v.messagecontent != undefined)
            if (msg.content.toLowerCase() == v.messagecontent.toLowerCase()) {
                v.cmd(msg, (await getUser(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }

        if (v.always == true) {
            v.cmd(msg, (await getUser(msg.member.id)));
            report.executed++;
            if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
        }

        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                v.cmd(msg, (await getUser(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }

        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                v.cmd(msg, (await getUser(msg.member.id)));

                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }
    }))
    DBHelper.increase(db, "msg_since_online");
    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
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





export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}