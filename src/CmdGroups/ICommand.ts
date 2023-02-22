import { DiscordAPIError } from "discord.js";
import * as Discord from 'discord.js';
import { Userdata } from "../Helper/Userdata";
import { GuildData } from "../Helper/GuildData";

export class CommandCollection {

}

export interface ICommand {
    prefix?:boolean
    ownerlimited?:boolean
    userlimitedids?:string[]
    grouplimitedids?:string[]
    messagecontent?:string
    always?:boolean
    triggerwords?:string[]
    triggerfunc?:(msg:Discord.Message) => boolean;
    typeofcmd?:TypeOfCmd
    cmd:(msg: Discord.Message, user?:Userdata, guild?:GuildData) => Promise<void|boolean>
    isHalting?:boolean
    canHalt?:boolean

    visibleInHelp?:boolean
    simpleHelpName?:string
    helpDescription?:string
}

export enum TypeOfCmd {
    Action,
    Moderation,
    Other,
    Information
}