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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateSortedFilter = exports.setUser = exports.getUser = exports.Userdata = exports.RPG = exports.getRandom = exports.CheckForManyWordsCI = exports.CheckForManyWords = exports.SimplePerRules = exports.ResultReport = void 0;
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const db_helper_1 = require("../db.helper");
const lodash_1 = __importDefault(require("lodash"));
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
                v.cmd(msg, (yield getUser(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.always == true) {
            v.cmd(msg, (yield getUser(msg.member.id)));
            report.executed++;
            if (v.isHalting == true) {
                report.halting = true;
                return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
            }
        }
        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                v.cmd(msg, (yield getUser(msg.member.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                v.cmd(msg, (yield getUser(msg.member.id)));
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
class RPG {
    constructor() {
        this.money = 50;
        this.str = 5;
        this.agi = 5;
        this.vit = 5;
        this.int = 5;
        this.dex = 5;
        this.luk = 5;
        this.harshness = 0;
        /**
         * Exp that is used to check if next level is reached.
         * Never access this directly! Read-only
         * Access with expToNextLevel()
         */
        this.currentexp = 0;
        this.skillpoints = 0;
        this.level = 1;
        this.inventory = [];
    }
    /**
     *
     * @returns
     */
    expToNextLevel() { return this.currentexp; }
    /**
     * All Exp ever received.
     */
    allExp() {
        return (this.level != 1 ? this.getExpNeeded(this.level - 1) : 0) + this.currentexp;
    }
    ;
    /**
     *
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    nextLevelExpRequired() {
        return Math.pow(this.level, 3) + Math.pow(this.level, 2) * 23 + 100 * this.level + 100;
    }
    getExpNeeded(level) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    addExp(amount) {
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
}
exports.RPG = RPG;
class Userdata {
    constructor() {
        this.msgs = 10;
    }
    test() {
        //console.log("Test Executed")
    }
}
exports.Userdata = Userdata;
function getUser(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        var key = "user" + userid;
        if (yield app_1.db.exists(key)) {
            let userdata = lodash_1.default.assignIn(new Userdata(), yield (app_1.db.get(key)));
            userdata.rpg = lodash_1.default.assignIn(new RPG(), userdata.rpg);
            userdata.id = userid;
            return userdata;
        }
        else {
            console.log("New User");
            return new Userdata();
        }
    });
}
exports.getUser = getUser;
function setUser(userid, userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield app_1.db.put("user" + userid, userdata);
    });
}
exports.setUser = setUser;
function iterateSortedFilter(enumeF) {
    return __awaiter(this, void 0, void 0, function* () {
        let listed = yield (yield app_1.db.iterateFilter((v) => { return (!!v.msgs); })).sort();
    });
}
exports.iterateSortedFilter = iterateSortedFilter;
//# sourceMappingURL=command.helper.js.map