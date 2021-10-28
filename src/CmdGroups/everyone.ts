import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { DBHelper } from "../db.helper";


export let EveryoneCommands : ICommand[] = [
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg:Discord.Message) {
            await DBHelper.increase(db,"user"+msg.member.id+".msgs",1)
            console.log(await db.get("user"+msg.member.id+".msgs"))
        }
    }
]