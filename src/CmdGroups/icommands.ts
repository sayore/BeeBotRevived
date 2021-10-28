import { DiscordAPIError } from "discord.js";
import * as Discord from 'discord.js';

export interface ICommand {
    prefix?:boolean
    userlimitedids?:string[]
    grouplimitedids?:string[]
    messagecontent?:string
    triggerwords?:string[]
    triggerfunc?:(msg:Discord.Message) => boolean;
    typeofcmd?:TypeOfCmd
    cmd(msg: Discord.Message) : void
}


export enum TypeOfCmd {
    Action,
    Moderation,
    Other,
    Information
}