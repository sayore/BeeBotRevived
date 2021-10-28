import * as Discord from 'discord.js';
export interface ICommand {
    prefix?: boolean;
    userlimitedids?: string[];
    grouplimitedids?: string[];
    messagecontent?: string;
    always?: boolean;
    triggerwords?: string[];
    triggerfunc?: (msg: Discord.Message) => boolean;
    typeofcmd?: TypeOfCmd;
    cmd(msg: Discord.Message): void;
    isHalting?: boolean;
}
export declare enum TypeOfCmd {
    Action = 0,
    Moderation = 1,
    Other = 2,
    Information = 3
}