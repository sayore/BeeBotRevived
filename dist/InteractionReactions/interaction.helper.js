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
exports.setUser = exports.getUser = exports.SimpleReactionsPerRules = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const command_helper_1 = require("../CmdGroups/command.helper");
const db_helper_1 = require("../db.helper");
function SimpleReactionsPerRules(cmds, interaction, reports) {
    let report = { executed: 0, errors: [], halting: false };
    //if (interaction.user.id == clientBee.user.id || interaction.user.id == clientBob.user.id) { Logging.log("This is me or bob."); return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); } // This is Bee himself
    if (reports)
        if (reports.halting)
            return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
    if (interaction.isButton()) {
        Logging_1.Logging.log(interaction.type + " " + interaction.user.id + " " + interaction.customId, "Interact");
    }
    else {
        Logging_1.Logging.log(interaction.type + " " + interaction.user.id, "Interact");
    }
    cmds.forEach(((v) => __awaiter(this, void 0, void 0, function* () {
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(interaction.user.id) == -1) {
                return;
            } //This checks for privelege for the command on a per user basis
        if (v.typeOfInteraction == "Button") {
            if (!interaction.isButton()) {
                return;
            }
        }
        //
        if (v.ownerlimited != undefined)
            if (v.ownerlimited == true && interaction.guild.ownerId != interaction.user.id) {
                return;
            }
        if (v.customId != undefined && interaction.isButton())
            if (interaction.customId.toLowerCase() == v.customId.toLowerCase()) {
                v.reaction(interaction, (yield getUser(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.always == true) {
            v.reaction(interaction, (yield getUser(interaction.user.id)));
            report.executed++;
            if (v.isHalting == true) {
                report.halting = true;
                return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
            }
        }
        if (v.triggerwords != undefined && interaction.isButton() && v.triggerwords.length >= 1)
            if ((0, command_helper_1.CheckForManyWordsCI)(interaction.customId, v.triggerwords)) {
                v.reaction(interaction, (yield getUser(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(interaction)) {
                v.reaction(interaction, (yield getUser(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
    })));
    db_helper_1.DBHelper.increase(app_1.db, "msg_since_online");
    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
}
exports.SimpleReactionsPerRules = SimpleReactionsPerRules;
// TODO: IMPORTANT!! Refactor this outside of the helper AS SOON AS POSSIBLE, there is a duplicate
function getUser(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        var key = "user" + userid;
        if (yield app_1.db.exists(key)) {
            let userdata = lodash_1.default.assignIn(new command_helper_1.Userdata(), yield (app_1.db.get(key)));
            userdata.rpg = lodash_1.default.assignIn(new command_helper_1.RPG(), userdata.rpg);
            userdata.id = userid;
            return userdata;
        }
        else {
            console.log("New User");
            return new command_helper_1.Userdata();
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
//# sourceMappingURL=interaction.helper.js.map