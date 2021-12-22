import * as Discord from 'discord.js';

export interface IReaction {
    customId:string;
    
    reaction(interaction:Discord.Interaction);
}