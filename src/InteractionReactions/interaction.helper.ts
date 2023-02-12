import _ from "lodash";
import * as Discord from 'discord.js';
import { Logging } from "supernode/Base/Logging";
import { clientBee, clientBob, db } from "../app";
import { CheckForManyWordsCI, ResultReport } from "../CmdGroups/command.helper";
import { DBHelper } from "../db.helper";
import { IReaction } from "./ireaction";
import { Userdata } from "../Helper/user";

/**
 * 
 * @param cmds 
 * @param interaction 
 * @param reports 
 * @returns 
 */
export function SimpleReactionsPerRules(cmds: IReaction[], interaction: Discord.Interaction, reports?: ResultReport): ResultReport {
    let report = { executed: 0, errors: [], halting: false }
    //if (interaction.user.id == clientBee.user.id || interaction.user.id == clientBob.user.id) { Logging.log("This is me or bob."); return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); } // This is Bee himself
    if (reports) if (reports.halting) return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
    
    if(interaction.isButton()) {
        Logging.log(interaction.type+" "+interaction.user.id+" "+interaction.customId,"Interact")
    } else {
        Logging.log(interaction.type+" "+interaction.user.id,"Interact")
    }
    cmds.forEach((async v => {
        if (v.userlimitedids != undefined)
            if (v.userlimitedids.indexOf(interaction.user.id) == -1) { return; } //This checks for privelege for the command on a per user basis

        if(v.typeOfInteraction=="Button"){
            if(!interaction.isButton()) {
                return;
            }
        }
        //

        if (v.ownerlimited != undefined)
            if (v.ownerlimited == true && interaction.guild.ownerId != interaction.user.id) { return; }

        if (v.customId != undefined && interaction.isButton())
            if (interaction.customId.toLowerCase() == v.customId.toLowerCase()) {
                v.reaction(interaction, (await Userdata.getUser(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }

        if (v.always == true) {
            v.reaction(interaction, (await Userdata.getUser(interaction.user.id)));
            report.executed++;
            if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
        }

        if (v.triggerwords != undefined  && interaction.isButton() && v.triggerwords.length >= 1)
            if (CheckForManyWordsCI(interaction.customId, v.triggerwords)) {
                v.reaction(interaction, (await Userdata.getUser(interaction.user.id)));
                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }

        if (v.triggerfunc != undefined)
            if (v.triggerfunc(interaction)) {
                v.reaction(interaction, (await Userdata.getUser(interaction.user.id)));

                report.executed++;
                if (v.isHalting == true) { report.halting = true; return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed); }
            }
    }))
    DBHelper.increase(db, "msg_since_online");
    return new ResultReport(report.executed == 1, report.halting, cmds.length, report.executed);
}
