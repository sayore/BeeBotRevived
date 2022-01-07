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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateSortedFilter = exports.getMentions = exports.getRandom = exports.CheckForManyWordsCI = exports.CheckForManyWords = exports.SimplePerRules = exports.ResultReport = void 0;
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const app_2 = require("../app");
class ResultReport {
    constructor(executed, halting = false, scanned = 0, executedNum = 0, matchedNum = 0) {
        this.executed = executed;
        this.halting = halting;
        this.scanned = scanned;
        this.executedNum = executedNum;
        this.matchedNum = matchedNum;
        this.noConsoleLog = false;
        this.start = Date.now();
    }
    add(resrep) {
        this.executed = resrep.executed || this.executed;
        this.halting = resrep.halting || this.halting;
        this.scanned += resrep.scanned;
        this.executedNum += resrep.executedNum;
        this.noConsoleLog = resrep.noConsoleLog || this.noConsoleLog;
        this.matchedNum += resrep.matchedNum;
        return this;
    }
    setNoConsoleLog() { this.noConsoleLog = true; return this; }
    setExecuted(arg0) { this.executed = arg0; return this; }
    addScanned(arg0) { this.scanned += arg0; return this; }
    addExecuted(isHalting = false) {
        this.executed = true;
        this.executedNum++;
        this.halting = isHalting || this.halting;
        return this;
    }
    report() {
        if (!this.noConsoleLog)
            Logging_1.Logging.log(`Scanned ${this.scanned} commands. ${this.matchedNum} matched and executed ${this.executedNum}. (Took ${Date.now() - this.start}ms) ${(this.halting ? "Halted" : "")}`, "Reporter");
    }
}
exports.ResultReport = ResultReport;
function SimplePerRules(cmds, msg, user, reports = new ResultReport(false, false, 0, 0, 0)) {
    var cmds_1, cmds_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        //let report = { executed: (reports?reports.executedNum:0), errors: [], halting: (reports?reports.executed:false) }
        // This is Bee himself
        if (msg.author.id == app_2.clientBee.user.id || msg.author.id == app_2.clientBob.user.id) {
            return reports.setNoConsoleLog();
        }
        // If any command wants to halt now, do it.
        reports.addScanned(cmds.length);
        if (reports)
            if (reports.halting)
                return reports;
        try {
            //Check that conditionals are met, then execute the cmd.
            for (cmds_1 = __asyncValues(cmds); cmds_1_1 = yield cmds_1.next(), !cmds_1_1.done;) {
                const v = cmds_1_1.value;
                reports.matchedNum += 1;
                if (!!v.userlimitedids) {
                    if (v.userlimitedids.indexOf(msg.author.id) == -1) {
                        continue;
                    }
                } //This checks for privelege for the command on a per user basis
                //Logging.log(JSON.stringify(v)) 
                if (v.ownerlimited != undefined) {
                    if (v.ownerlimited == true && msg.guild.ownerId != msg.author.id) {
                        continue;
                    }
                }
                if (v.triggerfunc != undefined) {
                    //console.log(v.userlimitedids)
                    if (v.triggerfunc(msg)) {
                        v.cmd(msg, (user));
                        reports.addExecuted(v.isHalting);
                        if (v.isHalting)
                            return reports;
                    }
                }
                if (v.messagecontent != undefined) {
                    if (msg.content.toLowerCase() == v.messagecontent.toLowerCase()) {
                        v.cmd(msg, (user));
                        reports.addExecuted(v.isHalting);
                        if (v.isHalting)
                            return reports;
                    }
                }
                if (v.always == true) {
                    v.cmd(msg, (user));
                    reports.addExecuted(v.isHalting);
                    if (v.isHalting)
                        return reports;
                }
                if (v.triggerwords != undefined && v.triggerwords.length >= 1) {
                    if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                        v.cmd(msg, (user));
                        reports.addExecuted(v.isHalting);
                        if (v.isHalting)
                            return reports;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cmds_1_1 && !cmds_1_1.done && (_a = cmds_1.return)) yield _a.call(cmds_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return reports;
    });
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
function getMentions(msgstr) {
    let rets = [];
    let safety = 200;
    var idscan = "";
    while (msgstr.includes("<@!")) {
        let pos = msgstr.indexOf("<@!");
        idscan = "";
        do {
            if ("0123456789".includes(msgstr.charAt(pos)))
                idscan += msgstr.charAt(pos);
            /**console.log(msg.content.charAt(pos))*/
            safety--;
            pos++;
            if (safety == 0) {
                Logging_1.Logging.log("Needed to break");
                break;
            }
        } while (msgstr.charAt(pos) != ">");
        console.log(idscan);
        msgstr = msgstr.replace("<@!" + idscan + ">", "");
        //msgstr.replace(idscan,"");
        rets.push(idscan);
    }
    return rets;
}
exports.getMentions = getMentions;
function iterateSortedFilter(enumeF) {
    return __awaiter(this, void 0, void 0, function* () {
        let listed = yield (yield app_1.db.iterateFilter((v) => { return (!!v.msgs); })).sort();
    });
}
exports.iterateSortedFilter = iterateSortedFilter;
//# sourceMappingURL=command.helper.js.map