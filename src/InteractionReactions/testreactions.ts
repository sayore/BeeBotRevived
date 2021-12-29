import { RPG } from "../RPG/rpg";
import { IReaction } from "./ireaction";

export let TestReactions: IReaction[] =[
    {
        customId: "bbtext",
        typeOfInteraction:"Button",
        reaction: (interaction, clicker)=>{
            console.log("Clicked!")
            console.log("Clicked by "+clicker.id)
            console.log("User has "+RPG.allExp(clicker.rpg)+" EXP")
        }
    }
]