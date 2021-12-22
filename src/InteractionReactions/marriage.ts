import * as Discord from 'discord.js';
import { IReaction } from "./ireaction";

export let MarriageReactions:IReaction[] = [
    {
        customId:'accept-marriage',
        reaction:(interaction:Discord.Interaction)=>{
            
        }
    },
    {
        customId:'reject-marriage',
        reaction:(interaction:Discord.Interaction)=>{
            
        }
    },
    {
        customId:'accept-divorce',
        reaction:(interaction:Discord.Interaction)=>{
            
        }
    },{
        customId:'reject-divorce',
        reaction:(interaction:Discord.Interaction)=>{
            
        }
    }
];