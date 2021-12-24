import * as Discord from 'discord.js';
import { ResultReport } from "../CmdGroups/command.helper";
import { IReaction } from "./ireaction";
export declare function SimpleReactionsPerRules(cmds: IReaction[], interaction: Discord.Interaction, reports?: ResultReport): ResultReport;
