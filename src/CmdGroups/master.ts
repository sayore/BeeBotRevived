import { ICommand } from "./icommands";
import * as Discord from 'discord.js';
import { CheckForManyWords, getMentions, iterateSortedFilter } from "./command.helper";
import { clientBee, db, EnvFile, randomEvents } from "../app";
import { MessageHelper } from "supernode/Discord/MessageHelper";
import { Environment } from "supernode/Base/Environment";
import { Logging } from "supernode/Base/Logging";
import _ from "lodash";
import { getUser, setUser, Userdata } from '../Helper/user';
import { RPG } from '../RPG/rpg';

export let MasterCommands : ICommand[] = [
    {
        ownerlimited:true,
        triggerwords:["bee","access","can","database","?"],
        async cmd(msg:Discord.Message){
            
            msg.reply(`${await db?"yes":"no"} uwu`);
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","event","now"],
        async cmd(msg:Discord.Message){
            msg.delete();
            randomEvents.randomAction();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","stats"],
        async cmd(msg:Discord.Message){
            console.log(msg.content)
            msg.delete();
            let target_id=msg.member.id;
            getMentions(msg.content)
            
            let userdata=await getUser(target_id);
            msg.channel.send(target_id);
            msg.channel.send(JSON.stringify(userdata));
            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","logthis"],
        async cmd(msg:Discord.Message){
            Logging.log(msg.content,"LogThis")
            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["beesaythis"],
        async cmd(msg:Discord.Message){
            Logging.log(msg.content,"SayThis")
            msg.channel.send(msg.content.replace("beesaythis ",""));
            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","most","money"],
        async cmd(msg:Discord.Message){
            console.log(msg.content)
            msg.delete();
            let toplist= await db.iterateFilter((v) => { return (!!v.rpg?.money); });
            
            toplist = await toplist.sort((a, b) => {
                if(a.rpg.money == b.rpg.money) return 0;
                return a.rpg.money < b.rpg.money ? 1 : -1;
            })
            //msg.channel.send(JSON.stringify(toplist)); 
            let sToplist = "";
            
            for (let i = 0; i < toplist.length; i++) {
                const v = toplist[i];
                var membername:string;
                if(toplist[i].tag)
                {
                    membername = toplist[i].tag
                }
                else
                {
                    var member = await msg.guild.members.fetch({user:v.id});
                    membername = member.displayName
                    setUser(member,toplist[i]);
                }
                sToplist+=`\` ${(Math.floor(v.rpg.money).toString()+" $").padEnd(15," ")} ${membername.padEnd(40," ")} \`\n`;
            }
            
            msg.channel.send(sToplist); 
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","most","exp"],
        async cmd(msg:Discord.Message){
            console.log(msg.content)
            msg.delete();
            let toplist= <Userdata[]>(await db.iterateFilter((v) => { return (!!v.rpg); }));
            
            // Loads RPG functions, without this, no "allExp()"
            for (let i = 0; i < toplist.length; i++) {
                toplist[i].rpg = toplist[i].rpg = <RPG>_.assignIn(new RPG(), toplist[i].rpg);;
            }

            toplist = await toplist.sort((a, b) => {
                let axp = a.rpg.allExp();
                let bxp = b.rpg.allExp();
                if(axp == bxp) return 0;
                return axp < bxp ? 1 : -1;
            })
            //msg.channel.send(JSON.stringify(toplist)); 
            let sToplist = "";
            
            for (let i = 0; i < toplist.length; i++) {
                const v = toplist[i];
                var membername: string;
                if(toplist[i].tag)
                {
                    membername = toplist[i].tag
                }
                else
                {
                    var member = await msg.guild.members.fetch({user:v.id});
                    membername = member.displayName
                    setUser(member,toplist[i]);
                } 
                sToplist+=`\` ${(Math.floor(v.rpg.allExp()).toString()+" EXP").padEnd(15," ")} ${membername.padEnd(40," ")} \`\n`;
            }
            
            msg.channel.send(sToplist); 
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","db"],
        async cmd(msg:Discord.Message){
            console.log(msg.content)
            msg.delete();
            const iterator = db.iterate({ });
            // ? iterator.seek(...); // You can first seek if you'd like.
            for await (const { key, value } of iterator) {
                msg.channel.send(key+":"+ value); // Useable, readable and fast!
            } // If the end of the iterable is reached, iterator.end() is callend.
            await iterator.end();            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["add","channel","to","random"],
        async cmd(msg:Discord.Message){
            var env : any = Environment.load(EnvFile);
            if(env.randomChannels == undefined) {
                env.randomChannels = [msg.channelId];
            } else {
                if(env.randomChannels.includes(msg.channelId)) {
                    let myReply= msg.reply(`channel is already added to random ev`);
                    setTimeout(async()=>{msg.delete();(await myReply).delete()},3500);
                } else {
                    env.randomChannels.push(msg.channelId);
                    msg.delete();
                }
            }
            Environment.save(EnvFile,env);
        }
    },
    {
        triggerfunc:(msg:Discord.Message)=>{
            MessageHelper.getRepliantsVisibleName(msg)
            if(msg.content.toString().indexOf(' ')===-1 && msg.content.toString().startsWith('<')  && msg.content.toString().endsWith('>') && msg.content.toString().toLowerCase().indexOf('pat')!==-1)
            {
                Logging.log("A"+ msg.mentions)
                Logging.log(MessageHelper.isRepliant(msg, clientBee.user.id))
                Logging.log(MessageHelper.hasRepliant(msg))
                Logging.log(msg)
                if(MessageHelper.isRepliant(msg, clientBee.user.id)) {
                    return true;
                }
            }
            return false;
         },
        async cmd(msg:Discord.Message){
            msg.reply(`(* -ω- )`);
        }
    },
    {
        ownerlimited:true,
        messagecontent:"good morning bee",
        async cmd(msg:Discord.Message){
            msg.reply("good morning master ʕ ᵔ//ᴥ/ᵔʔ");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["how","many","last","message"],
        async cmd(msg:Discord.Message){
            setTimeout(async()=>{
                await msg.reply("uwu let me think");
                setTimeout(async()=>{
                    await msg.reply(`i think ${await db.get("msg_since_online")} times + or - 1 idk uwu *blushes*`);
                },500)
            },500)
        }
    },
    {
        ownerlimited:true,
        triggerwords:["who","master","is","bee"],
        async cmd(msg:Discord.Message){
            setTimeout(async()=>{
                await msg.reply("sayore is my master ***blushes*** owo");
            },500)
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","kick","pleb"],
        async cmd(msg:Discord.Message){
            setTimeout(async()=>{
                await msg.reply("oki master ***blushes*** owo");
                setTimeout(async()=>{
                    let guildmember = msg.mentions.members.first()
                    if(guildmember && guildmember.kickable){
                        await msg.mentions.members.first().kick("Master told me so uwu")
                        await msg.channel.send("done \(◦'⌣'◦)/.");
                    }
                    else {
                        await msg.channel.send("i cant \(◦'⌣'◦)/.");
                        await msg.channel.send("pls dont be mad at me uwu");
                    }
                },500)
            },500)
        }
    },
    {
        ownerlimited:true,
        messagecontent:"bee only listens to me",
        async cmd(msg:Discord.Message){
            msg.reply("thats right, i only listen to my master uwu (except for normal commands)");
        }
    },
    {
        ownerlimited:true,
        messagecontent:"good bee",
        async cmd(msg:Discord.Message){
            msg.reply("yay \(◦'⌣'◦)/.");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["stfu","bee"],
        async cmd(msg:Discord.Message){
            msg.reply("ok ʕノ)ᴥ(ヾʔ");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","understood","me"],
        async cmd(msg:Discord.Message){
            msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
        }
    },
];

/**
 *


        if(CheckForManyWords(msg.content,["stfu","bee"])) {
            msg.reply("ok ʕノ)ᴥ(ヾʔ");
        }
        if(CheckForManyWords(msg.content,["bee","understood","me"])) {
            msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
        }
 * 
 */