import * as Discord from 'discord.js';
import { Logging } from 'supernode/Base/Logging';
import { db } from '../app';
import { DBHelper } from '../db.helper';
import { ICommand } from "./icommands";

export class ResultReport {
    constructor(
            public executed : boolean,
            public halting = false,
            public scanned?:number,
            public executedNum?:number) {

    }

    add(resrep:ResultReport) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        return this;
    }
    report() {
        Logging.log(`Scanned ${this.scanned} commands. ${this.executedNum} matched and executed(=>${this.executed}).`,"Reporter")
    }
}

export function SimplePerRules(cmds:ICommand[],msg:Discord.Message, reports?:ResultReport) : ResultReport {
    if(msg.author.id == "732377258857070602") { Logging.log("This is me :shyduck:"); return;} // This is Bee himself
    if(reports) if(reports.halting) return;
    let report = {executed:0, errors:[], halting:false} 
    cmds.forEach((v=>{
        if(v.userlimitedids!=undefined )
        if(v.userlimitedids.indexOf(msg.author.id) == -1) 
        { return; } //This checks for privelege for the command on a per user basis
        //Logging.log(v.userlimitedids)
            
        if(v.ownerlimited!=undefined)
        if(v.ownerlimited==true && msg.guild.ownerId!=msg.author.id)
        { return; }
        
        if(v.messagecontent!=undefined)
        if(msg.content.toLowerCase()==v.messagecontent.toLowerCase()) {
            v.cmd(msg);
            report.executed++;
            if(v.isHalting==true) {report.halting=true; return;}
        }

        if(v.always==true) { 
            v.cmd(msg);
            report.executed++;
            if(v.isHalting==true) {report.halting=true; return;}
        }

        if(v.triggerwords!=undefined && v.triggerwords.length>=1)
        if(CheckForManyWordsCI(msg.content,v.triggerwords)) {
            v.cmd(msg);
            report.executed++;
            if(v.isHalting==true) {report.halting=true; return;}
        }

        if(v.triggerfunc!=undefined)
        if(v.triggerfunc(msg)) {
            v.cmd(msg);
            report.executed++;
            if(v.isHalting==true) {report.halting=true; return;}
        }
    }))
    DBHelper.increase(db,"msg_since_online");
    return new ResultReport(report.executed==1, report.halting, cmds.length, report.executed);
}

export function CheckForManyWords(message:string, words: string[]) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        if(message.indexOf(word)==-1) {return false;}
    }
    return true;
}

export function CheckForManyWordsCI(message:string, words: string[]) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        if(message.toLowerCase().indexOf(word)==-1) {return false;}
    }
    return true;
}

export function getRandom<T>(arr:T[]) : T {
    return arr[Math.floor(Math.random()*arr.length)];
}