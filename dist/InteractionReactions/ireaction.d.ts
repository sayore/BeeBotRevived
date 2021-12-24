import * as Discord from 'discord.js';
import { Userdata } from '../CmdGroups/command.helper';
export interface IReaction {
    customId: string;
    prefix?: boolean;
    ownerlimited?: boolean;
    userlimitedids?: string[];
    grouplimitedids?: string[];
    typeOfInteraction: ("Button");
    always?: boolean;
    triggerwords?: string[];
    triggerfunc?: (msg: Discord.Interaction) => boolean;
    reaction(interaction: Discord.Interaction, user?: Userdata): any;
    isHalting?: boolean;
}
