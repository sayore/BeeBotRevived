import { ICommand } from "./ICommand";
import * as Discord from 'discord.js';
import { CheckForManyWords, getMentions, getAllUsers } from "./command.helper";
import { clientBee, db, EnvFile, randomEvents } from "../app";
import { MessageHelper } from "supernode/Discord/MessageHelper";
import { Environment } from "supernode/Base/Environment";
import { Logging } from "supernode/Base/Logging";
import _ from "lodash";
import { Userdata } from '../Helper/Userdata';
import { RPG } from '../RPG/BaseRPG';
import { GuildData } from "../Helper/GuildData";
import { MessageData } from "../Helper/MessageData";
import { StringExt } from "supernode/String/StringExt";
import { DiscordStringExt } from "../Helper/StringExt";

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
        triggerwords:["katze update"],
        async cmd(msg:Discord.Message){
            process.exit(-1);
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","stats"],
        async cmd(msg:Discord.Message,user){
            console.log(msg.content)
            msg.delete();
            let mentioned = getMentions(msg.content)
            
            if(mentioned.length==1)
            {let askedFor=await Userdata.getUser(mentioned[0]);
            msg.channel.send(mentioned[0]);
            msg.channel.send(JSON.stringify(askedFor));}
            else {
                msg.channel.send(JSON.stringify(user));
            }
            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["unstyle"],
        async cmd(msg:Discord.Message,user){
            msg.reply(DiscordStringExt.unStyleAll(msg.content))
            
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
            let toplist= <Userdata[]>(await getAllUsers());
            
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
                    var member : null | Discord.GuildMember = null;
                    try {
                        member = await msg.guild.members.fetch({user:v.id});
                    } catch (error) { 
                        member = null;
                    }
                    membername = member?.displayName
                    membername ??= "Unknown User"
                    toplist[i].extra ??= {left:!!member};
                    Userdata.setUser(member,toplist[i]);
                }
                sToplist+=`\` ${(Math.floor(v.rpg.money).toString()+" $").padEnd(15," ")} ${(membername?membername:"NFI").padEnd(40," ")} \`\n`;
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
            let toplist= <Userdata[]>(await getAllUsers());
            
            console.log(toplist.map(tl=>tl.rpg.currentexp))

            toplist = await toplist.sort((a, b) => {
                let axp = RPG.allExp(a.rpg);
                let bxp = RPG.allExp(b.rpg);
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
                    var member : null | Discord.GuildMember = null;
                    try {
                        member = await msg.guild.members.fetch({user:v.id});
                    } catch (error) { 
                        member = null;
                    }
                    membername = member?.displayName
                    membername ??= "Unknown User"
                    toplist[i].extra ??= {left:!!member};
                    Userdata.setUser(member,toplist[i]);
                }
                if(!membername) msg.channel.send(i+": "+JSON.stringify(v));
                sToplist+=`\` ${(Math.floor(RPG.allExp(v.rpg)).toString()+" EXP").padEnd(15," ")} ${(membername?membername:"NFI").padEnd(40," ")} \`\n`;
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
                console.log(key+":"+ value); // Useable, readable and fast!
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
        triggerwords:["wer","dein meister","ist","katze"],
        async cmd(msg:Discord.Message){
            setTimeout(async()=>{
                await msg.reply("<@!100656035718516736> is my master ***blushes*** owo");
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
        triggerwords:["bee","react", "with"],
        async cmd(msg:Discord.Message){
            var split = msg.content.split(" ");
            split.shift()
            split.shift()
            split.shift() 
            msg.reply(split.join(' '))
            var reactRolesObj:{emojis:string[],names:string[],message} = JSON.parse(split.join(' '));

            msg.channel.send(reactRolesObj.message+"\n\n"+reactRolesObj.names.map((v,i)=>{ return reactRolesObj.emojis[i] + " " + v }).join("\n")).then(async (msg:Discord.Message)=>{
                MessageData.getMessageById(msg.id).then((msgData:MessageData)=>{
                    msgData.extra.reactRoles = reactRolesObj;
                    msgData.save();
                })

                for (let i = 0; i < reactRolesObj.emojis.length; i++) {
                    await msg.react(reactRolesObj.emojis[i]);
                }
            })

            reactRolesObj.names.forEach((v:string,i)=>{
                //If role doesnt exist, create it
                var finding = msg.guild.roles.cache.find((role:Discord.Role)=>{return role.name == v});
                
                if(finding) return;
                msg.guild.roles.create({name:v,mentionable:false,hoist:false,position:0,reason:"react role",color:0x000000})
            })


        }
    },
    {
        ownerlimited:true,
        triggerfunc(msg) {
            return msg.content.toLowerCase().startsWith("katze redirect")
        },
        async cmd(msg:Discord.Message){
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length == 4) {
                //check if argument is number and if channel exists
                if(!isNaN(parseInt(msgsplit[3])) && msgsplit[2] == "to") {
                    let channel = await clientBee.channels.fetch(msgsplit[3]);
                    if(channel) {
                        let guild = await GuildData.getGuildById(msg.guild.id);
                        if(guild) {
                            guild.extra ??= {}; //if guild.extra is undefined, set it to an empty object
                            guild.extra.messageRedirects ??= {}; //if guild.extra.messageRedirects is undefined, set it to an empty object
                            if(_.isArray(guild.extra.messageRedirects)) guild.extra.messageRedirects = {};
                            guild.extra.messageRedirects[msg.channelId] = {to: msgsplit[3]};
                            GuildData.setGuildById(msg.guild.id,guild);
                            msg.reply("done");
                        }
                    }
                }
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","understood","me"],
        async cmd(msg:Discord.Message){
            msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","set","welcome","message"],
        async cmd(msg:Discord.Message,user,guild){
            if(guild) {
                guild.welcomeMessage = msg.content.replace("bee set welcome message ","");
                guild.welcomeMessageEnabled = true;
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","set","welcome","channel"],
        async cmd(msg:Discord.Message,user,guild){
            let msgsplit = msg.content.split(" ");
            if(guild) {
                guild.welcomeMessageChannel = msgsplit[4];
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","set","welcome","enable"],
        async cmd(msg:Discord.Message,user,guild){
            let msgsplit = msg.content.split(" ");
            if(guild) {
                guild.welcomeMessageEnabled = true;
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["bee","set","welcome","disable"],
        async cmd(msg:Discord.Message,user,guild){
            let msgsplit = msg.content.split(" ");
            if(guild) {
                guild.welcomeMessageEnabled = false;
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
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