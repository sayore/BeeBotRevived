"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateSortedFilter = exports.getRandom = exports.CheckForManyWordsCI = exports.CheckForManyWords = exports.SimplePerRules = exports.ResultReport = void 0;
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const db_helper_1 = require("../db.helper");
const app_2 = require("../app");
const user_1 = require("../Helper/user");
class ResultReport {
    constructor(executed, halting = false, scanned, executedNum) {
        this.executed = executed;
        this.halting = halting;
        this.scanned = scanned;
        this.executedNum = executedNum;
        this.noConsoleLog = false;
        this.start = Date.now();
    }
    add(resrep) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        this.noConsoleLog = resrep.noConsoleLog || this.noConsoleLog;
        return this;
    }
    setNoConsoleLog() { this.noConsoleLog = true; return this; }
    report() {
        if (!this.noConsoleLog)
            Logging_1.Logging.log(`Scanned ${this.scanned} commands. ${this.executedNum} matched and executed(=>${this.executed}). (Took ${Date.now() - this.start}ms)`, "Reporter");
    }
}
exports.ResultReport = ResultReport;
function SimplePerRules(cmds, msg, reports) {
    let report = { executed: 0, errors: [], halting: false };
    // This is Bee himself
    if (msg.author.id == app_2.clientBee.user.id || msg.author.id == app_2.clientBob.user.id) {
        return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed).setNoConsoleLog();
    }
    // If any command wants to halt now, do it.
    if (reports)
        if (reports.halting)
            return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
    //Check that conditionals are met, then execute the cmd.
    cmds.forEach(((v) => __awaiter(this, void 0, void 0, function* () {
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
                v.cmd(msg, (yield (0, user_1.getUser)(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.always == true) {
            v.cmd(msg, (yield (0, user_1.getUser)(msg.member.id)));
            report.executed++;
            if (v.isHalting == true) {
                report.halting = true;
                return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
            }
        }
        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                v.cmd(msg, (yield (0, user_1.getUser)(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                v.cmd(msg, (yield (0, user_1.getUser)(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
    })));
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
function iterateSortedFilter(enumeF) {
    return __awaiter(this, void 0, void 0, function* () {
        let listed = yield (yield app_1.db.iterateFilter((v) => { return (!!v.msgs); })).sort();
    });
}
exports.iterateSortedFilter = iterateSortedFilter;
//# sourceMappingURL=command.helper.js.map