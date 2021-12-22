import * as Discord from 'discord.js';
import { Logging } from 'supernode/Base/Logging';
import { Item } from 'supernode/Game/Item';
import { ItemStack } from 'supernode/Game/ItemStack';
import { db } from '../app';
import { DBHelper } from '../db.helper';
import { ICommand } from "./icommands";
import { clientBee, clientBob } from "../app";
import _ from "lodash";

export class ResultReport {
    constructor(
        public executed: boolean,
        public halting = false,
        public scanned?: number,
        public executedNum?: number) {

    }

    add(resrep: ResultReport) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        return this;
    }
    report() {
        Logging.log(`Scanned ${this.scanned} commands. ${this.executedNum} matched and executed(=>${this.executed}).`, "Reporter")
    }
}

export function SimplePerRules(cmds: ICommand[], msg: Discord.Message, reports?: ResultReport): ResultReport {
    let report = { executed: 0, errors: [], halting: false }
    if (msg.author.id == clientBee.user.id || msg.author.id == clientBob.user.id) { Logging.log("This is me or bob."); return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); } // This is Bee himself
    if (reports) if (reports.halting) return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
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


export class RPG {
    money: number = 50;
    str: number = 5;
    agi: number = 5;
    vit: number = 5;
    int: number = 5;
    dex: number = 5;
    luk: number = 5;
    harshness = 0;
    /**
     * Exp that is used to check if next level is reached.
     * Never access this directly! Read-only
     * Access with expToNextLevel()
     */
    private currentexp: number = 0;
    /**
     * 
     * @returns 
     */
    expToNextLevel() : number {return this.currentexp;}
    /**
     * All Exp ever received.
     */
    allExp() {
        return (this.level != 1 ? this.getExpNeeded(this.level - 1) : 0) + this.currentexp;
    };
    skillpoints: number = 0;
    level: number = 1;
    /**
     * 
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    private nextLevelExpRequired() {
        return Math.pow(this.level, 3) + Math.pow(this.level, 2) * 23 + 100 * this.level + 100;
    }
    private getExpNeeded(level: number) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    addExp(amount: number) {
        this.currentexp += amount;
        /**
         * While we have more EXP in our CurrentXP, add level, increase skillpoints, and repeat.
         */
        while (this.currentexp >= this.nextLevelExpRequired()) {
            this.currentexp -= this.nextLevelExpRequired();
            this.skillpoints += 5 + Math.floor(this.level / 10);
            this.level += 1;
        }
        /**
         * Add the rest of the remaining EXP.
         */
        this.currentexp += amount;
    }
    inventory: ItemStack[] = [];
}
export class Userdata {
    id: string;
    tag: string;
    msgs: number = 10;
    rpg: RPG = new RPG();
    constructor() {

    }
    test(){
        //console.log("Test Executed")
    }
}

export async function getUser(userid: string): Promise<Userdata> {
    var key = "user" + userid;
    if (await db.exists(key)) {
        let userdata = <Userdata>_.assignIn(new Userdata(),await (db.get(key)));
        userdata.rpg = <RPG>_.assignIn(new RPG(), userdata.rpg);
        
        userdata.id = userid;
        return userdata;
    } else {
        console.log("New User")
        return new Userdata();
    }
}
export async function setUser(userid: string, userdata: Userdata) {
    return await db.put("user" + userid, userdata);
}

export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}