"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckForManyWordsCI = exports.CheckForManyWords = exports.SimplePerRules = void 0;
const app_1 = require("../app");
const db_helper_1 = require("../db.helper");
function SimplePerRules(cmds, msg) {
    if (msg.author.id == "732377258857070602") {
        console.log("This is me :shyduck:");
        return;
    } // This is Bee himself
    let report = { executed: 0, errors: [] };
    cmds.forEach((v => {
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(msg.author.id) == -1) {
                return;
            } //This checks for privelege for the command on a per user basis
        //console.log(v.userlimitedids)
        if (v.messagecontent != undefined)
            if (msg.content.toLowerCase() == v.messagecontent.toLowerCase()) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true)
                    return;
            }
        if (v.always == true) {
            v.cmd(msg);
            report.executed++;
            if (v.isHalting == true)
                return;
        }
        if (v.triggerwords != undefined && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(msg.content, v.triggerwords)) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true)
                    return;
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(msg)) {
                v.cmd(msg);
                report.executed++;
                if (v.isHalting == true)
                    return;
            }
    }));
    console.log(`Scanned ${cmds.length} commands. ${report.executed} matched and executed.`);
    db_helper_1.DBHelper.increase(app_1.db, "msg_since_online");
    return report.executed == 1;
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
//# sourceMappingURL=command.helper.js.map