"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.CheckForManyWordsCI = exports.CheckForManyWords = exports.SimplePerRules = exports.ResultReport = void 0;
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const db_helper_1 = require("../db.helper");
class ResultReport {
    constructor(executed, halting = false, scanned, executedNum) {
        this.executed = executed;
        this.halting = halting;
        this.scanned = scanned;
        this.executedNum = executedNum;
    }
    add(resrep) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        return this;
    }
    report() {
        Logging_1.Logging.log(`Scanned ${this.scanned} commands. ${this.executedNum} matched and executed(=>${this.executed}).`, "Reporter");
    }
}
exports.ResultReport = ResultReport;
function SimplePerRules(cmds, msg, reports) {
    let report = { executed: 0, errors: [], halting: false };
    if (msg.author.id == "732377258857070602") {
        Logging_1.Logging.log("This is me :shyduck:");
        return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
    } // This is Bee himself
    if (reports)
        if (reports.halting)
            return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
    cmds.forEach((v => {
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(msg.author.id) == -1) {
                return;
            } //This checks for privelege for the command on a per user basis
        //Logging.log(v.userlimitedids)
        if (v.ownerlimited != undefined)
            if (v.ownerlimited == true && msg.guild.ownerId != msg.author.id) {
                return;
            }
        if (v.messagecontent != undefined)
            if (msg.content.toLowerCase() == v.messagecontent.toLowerCase()) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.always == true) {
            v.cmd(msg);
            report.executed++;
            if (v.isHalting == true) {
                report.halting = true;
                return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
            }
        }
        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
    }));
    db_helper_1.DBHelper.increase(app_1.db, "msg_since_online");
    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
}
exports.SimplePerRules = SimplePerRules;
function CheckForManyWords(message, words) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (message.indexOf(word) == -1) {
            return false;
        }
    }
    return true;
}
exports.CheckForManyWords = CheckForManyWords;
function CheckForManyWordsCI(message, words) {
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (message.toLowerCase().indexOf(word) == -1) {
            return false;
        }
    }
    return true;
}
exports.CheckForManyWordsCI = CheckForManyWordsCI;
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.getRandom = getRandom;
//# sourceMappingURL=command.helper.js.map