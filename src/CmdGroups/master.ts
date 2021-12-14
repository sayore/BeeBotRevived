import { ICommand } from "./icommands";
import * as Discord from 'discord.js';
import { CheckForManyWords } from "./command.helper";
import { clientBee, db, EnvFile } from "../app";
import { MessageHelper } from "supernode/Discord/MessageHelper";
import { Environment } from "supernode/Base/Environment";

export let MasterCommands : ICommand[] = [
    {
        ownerlimited:true,
        messagecontent:"hello bee",
        async cmd(msg:Discord.Message){
            msg.reply("Hi master uwu");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","access","can","database","?"],
        async cmd(msg:Discord.Message){
            
            msg.reply(`${await db?"yes":"no"} uwu`);
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
                    msg.reply(`channel is already added to random ev`);
                } else {
                    env.randomChannels = [...msg.channelId];
                    msg.reply(`oki uwu`);
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
                console.log("A"+ msg.mentions)
                console.log(MessageHelper.isRepliant(msg, clientBee.user.id))
                console.log(MessageHelper.hasRepliant(msg))
                console.log(msg)
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