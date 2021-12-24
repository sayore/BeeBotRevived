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
exports.SimpleReactionsPerRules = void 0;
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const command_helper_1 = require("../CmdGroups/command.helper");
const db_helper_1 = require("../db.helper");
const user_1 = require("../Helper/user");
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
                v.reaction(interaction, (yield (0, user_1.getUser)(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.always == true) {
            v.reaction(interaction, (yield (0, user_1.getUser)(interaction.user.id)));
            report.executed++;
            if (v.isHalting == true) {
                report.halting = true;
                return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
            }
        }
        if (v.triggerwords != undefined && interaction.isButton() && v.triggerwords.length >= 1)
            if ((0, command_helper_1.CheckForManyWordsCI)(interaction.customId, v.triggerwords)) {
                v.reaction(interaction, (yield (0, user_1.getUser)(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) {
                    report.halting = true;
                    return new command_helper_1.ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
                }
            }
        if (v.triggerfunc != undefined)
            if (v.triggerfunc(interaction)) {
                v.reaction(interaction, (yield (0, user_1.getUser)(interaction.user.id)));
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
//# sourceMappingURL=interaction.helper.js.map