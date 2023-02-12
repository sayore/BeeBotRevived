import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { DBHelper } from "../db.helper";
import { Logging } from "supernode/Base/Logging";
import { RPG, RPGData } from "../RPG/rpg";
import _ from "lodash";
//import { getUser, setUser } from "./command.helper";

var randomUserIdCache:{time:number,id:string}[] = []

export let EveryoneCommands : ICommand[] = [
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg,userdata) {
            //console.log("Uhm")
            //console.log(JSON.stringify(userdata))
            if(await db.exists("user"+msg.member.id) && !(await db.exists("user"+msg.member.id+"converted"))) {
                console.log("Converting old User Profile...")
                //let userdata =new Userdata()
                _.assignIn(userdata,await (await db.get("user"+msg.member.id)));
                userdata.rpg = <RPGData>_.assignIn(new RPG(), userdata.rpg);
                //msg.reply(JSON.stringify(userdata));
                console.log("Success?...")
                db.put("user"+msg.member.id+"converted",true)
            }
            if(await db.exists("user"+msg.member.id+"::msgs")) {
                let msgs = await db.get("user"+msg.member.id+"::msgs");
                userdata.msgs+= msgs;
                RPG.addExp(userdata.rpg,userdata.msgs*15);
                await db.del("user"+msg.member.id+"::msgs");
            }
            if(await db.exists("user"+msg.member.id+".msgs")) {
                let msgs = await db.get("user"+msg.member.id+".msgs");
                userdata.msgs+= msgs;
                RPG.addExp(userdata.rpg,userdata.msgs*15);
                await db.del("user"+msg.member.id+".msgs");
            }
            

            /** Always add to the msg count */
            userdata.msgs++;


            /** Filter out all users that have passed the 5s mark from the cache */
            randomUserIdCache = randomUserIdCache.filter(e=>Date.now()-e.time<5000);
            var cachedUser=randomUserIdCache.find(e=>e.id==userdata.id);
            /** If the user isn't in the list, set a new timer, and also add EXP */
            if(!cachedUser) {
                userdata.rpg=RPG.addExp(userdata.rpg,7*Math.random());
                randomUserIdCache.push({id:userdata.id,time:Date.now()});
            }
            console.log(RPG.allExp(userdata.rpg))
            
            //await setUser(msg.member,userdata);
            //Logging.log(await db.get("user"+msg.member.id+".msgs"))


            //return;
        }
    }
]