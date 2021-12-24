import * as Discord from 'discord.js';
import { ResultReport, Userdata } from "../CmdGroups/command.helper";
import { IReaction } from "./ireaction";
export declare function SimpleReactionsPerRules(cmds: IReaction[], interaction: Discord.Interaction, reports?: ResultReport): ResultReport;
export declare function getUser(userid: string): Promise<Userdata>;
export declare function setUser(userid: string, userdata: Userdata): Promise<any>;
