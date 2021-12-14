import { DiscordAPIError } from "discord.js";
import * as Discord from 'discord.js';

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
    cmd(msg: Discord.Message) : void
    isHalting?:boolean
}


export enum TypeOfCmd {
    Action,
    Moderation,
    Other,
    Information
}