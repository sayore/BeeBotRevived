import * as Discord from 'discord.js';
import { Userdata } from "../Helper/user";
export interface ICommand {
    prefix?: boolean;
    ownerlimited?: boolean;
    userlimitedids?: string[];
    grouplimitedids?: string[];
    messagecontent?: string;
    always?: boolean;
    triggerwords?: string[];
    triggerfunc?: (msg: Discord.Message) => boolean;
    typeofcmd?: TypeOfCmd;
    cmd: (msg: Discord.Message, user?: Userdata) => Promise<void>;
    isHalting?: boolean;
}
export declare enum TypeOfCmd {
    Action = 0,
    Moderation = 1,
    Other = 2,
    Information = 3
}
