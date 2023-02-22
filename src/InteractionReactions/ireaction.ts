import * as Discord from 'discord.js';
import { Userdata } from '../Helper/Userdata';

export interface IReaction {
    customId:string;

    prefix?: boolean;
    ownerlimited?: boolean;
    userlimitedids?: string[];
    grouplimitedids?: string[];
    typeOfInteraction:("Button")
    always?: boolean;
    triggerwords?: string[];
    triggerfunc?: (msg: Discord.Interaction) => boolean;
    //typeofcmd?: TypeOfCmd;
    //cmd(msg: Discord.Message, user?: Userdata): void;
    reaction(interaction:Discord.Interaction, user?: Userdata);
    isHalting?: boolean;
    
}