import { ICommand } from "./ICommand";
import * as Discord from 'discord.js';
import { CheckForManyWords, getMentions, getAllUsers } from "./command.helper";
import { clientBee, db, EnvFile, randomEvents } from "../app";
import { MessageHelper } from "supernode/Discord/MessageHelper";
import { Environment } from "supernode/Base/Environment";
import { Logging } from "supernode/Base/Logging";
import _, { set } from "lodash";
import { Userdata } from '../Helper/Userdata';
import { RPG } from '../RPG/BaseRPG';
import { GuildData } from "../Helper/GuildData";
import { MessageData } from "../Helper/MessageData";
import { StringExt } from "supernode/String/StringExt";
import { DiscordStringExt } from "../Helper/StringExt";

export let MasterCommands : ICommand[] = [
    {
        ownerlimited:true,
        triggerwords:["!katze","access","can","database","?"],
        async cmd(msg:Discord.Message){
            
            msg.reply(`${await db?"yes":"no"} uwu`);
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","event","now"],
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
        triggerwords:["!katze-stats"],
        async cmd(msg:Discord.Message,user){
            console.log(msg.content)
            msg.delete();
            let mentioned = getMentions(msg.content)
            
            if(mentioned.length==1)
            {let askedFor=await Userdata.getUser(mentioned[0]);
            msg.channel.send(mentioned[0]);
            msg.channel.send("```json\n Name: "+askedFor.name+"("+(askedFor.rpg.alive?"Alive":"Dead")+") Farbe: "+askedFor.color
            +" Msgs: "+askedFor.msgs
            +" Level: "+askedFor.rpg.level
            +" Stats: "+askedFor.rpg.str+"/"+askedFor.rpg.dex+"/"+askedFor.rpg.int+"/"+askedFor.rpg.luk+"/"+askedFor.rpg.vit+"/"+askedFor.rpg.agi
            +"\n```");

            } else {
                msg.channel.send("```json\n Name: "+user.name+"("+(user.rpg.alive?"Alive":"Dead")+")"
                    +" Level: "+user.rpg.level
                    +" Stats: "+user.rpg.str+"/"+user.rpg.agi+"/"+user.rpg.vit+"/"+user.rpg.int+"/"+user.rpg.dex+"/"+user.rpg.luk
                    +"\n HP: "+ (RPG.getMaxHealth(user.rpg)-user.rpg.damage) + "/" + RPG.getMaxHealth(user.rpg)
                    +" Attack: "+ RPG.getAttack(user.rpg)
                    +" Defense: "+ RPG.getDefense(user.rpg)
                    +"\n```");
            }
            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["unstyle"],
        async cmd(msg:Discord.Message,user){
            msg.reply(DiscordStringExt.unstyle(msg.content))
            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","logthis"],
        async cmd(msg:Discord.Message){
            Logging.log(msg.content,"LogThis")
            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze mute"],
        async cmd(msg:Discord.Message){
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)

            if(mention)
            {
                var member = await msg.guild.members.fetch({user:mention});
                if(member)
                {
                    member.timeout(60*1000)
                }
            }

            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze unmute"],
        async cmd(msg:Discord.Message){
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)

            if(mention)
            {
                var member = await msg.guild.members.fetch({user:mention});
                if(member)
                {
                    member.timeout(0)
                }
            }

            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katzesaythis"],
        async cmd(msg:Discord.Message){
            Logging.log(msg.content,"SayThis")
            msg.channel.send(msg.content.replace("!katzesaythis ",""));
            msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","most","money"],
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
            
            for (let i = 0; i < 10; i++) {
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
        triggerwords:["!katze","most","exp"],
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
            
            for (let i = 0; i < 10; i++) {
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
        triggerwords:["!katze","db"],
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
        triggerwords:["!katze","kick","pleb"],
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
        messagecontent:"!katze only listens to me",
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
        triggerwords:["stfu","!katze"],
        async cmd(msg:Discord.Message){
            msg.reply("ok ʕノ)ᴥ(ヾʔ");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","react", "with"],
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
        triggerwords:["force-divorce"],
        async cmd(msg:Discord.Message){
            var split = msg.content.split(" ");

            if(split.length != 3) {
                msg.reply("Needs 2 Users as arguments");
                
                return;
            }
            
            const a = await Userdata.getUser(split[1])
            const b = await Userdata.getUser(split[2])

            a.marriedTo=a.marriedTo.filter((v)=>{return v !== b.id})
            b.marriedTo=b.marriedTo.filter((v)=>{return v !== a.id})

            setTimeout(async ()=>{
                await a.save();
                await b.save();
            },100)

            msg.channel.send("Users <@"+a.id+"> and <@"+b.id+"> have been forced to divorce");
            msg.deletable && msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerwords:["list-married"],
        async cmd(msg:Discord.Message){
            var split = msg.content.split(" ");

            if(split.length != 2) {
                msg.reply("Needs 1 Users as arguments");
                
                return;
            }
            
            const a = await Userdata.getUser(split[1])

            var list = await Promise.all(a.marriedTo.map(async(v)=>{
                var user = await Userdata.getUser(v);
                return user.id + " -> " +(user.name?user.name:"<@"+user.id+">");
            }))

            msg.channel.send("Users <@"+a.id+"> is married to \n"+list.join(", \n"));
        }
    },
    {
        ownerlimited:true,
        triggerwords:["force-marriage"],
        async cmd(msg:Discord.Message){
            var split = msg.content.split(" ");

            if(split.length != 3) {
                msg.reply("Needs 2 Users as arguments");
                
                return;
            }
            
            const a = await Userdata.getUser(split[1])
            const b = await Userdata.getUser(split[2])

            if(!a.marriedTo.includes(b.id)) {
                a.marriedTo.push(b.id)
            }
            if(!b.marriedTo.includes(a.id)) {
                b.marriedTo.push(a.id)
            }

            setTimeout(async ()=>{
                await a.save();
                await b.save();
            },100)
             

            msg.channel.send("Users <@"+a.id+"> and <@"+b.id+"> have been forced to marry");
            msg.deletable && msg.delete();
        }
    },
    {
        ownerlimited:true,
        triggerfunc(msg) {
            return msg.content.toLowerCase().startsWith("katze redirect")
        },
        async cmd(msg:Discord.Message){
            let msgsplit = msg.content.split(" ");
            
            //check if argument is number and if channel exists
            if(!isNaN(parseInt(msgsplit[2])) && msgsplit[3] == "to" && !isNaN(parseInt(msgsplit[4]))) {
                let channel = await clientBee.channels.fetch(msgsplit[2]);
                if(channel) {
                    let guild = await GuildData.getGuildById(msg.guild.id);
                    if(guild) {
                        guild.extra ??= {}; //if guild.extra is undefined, set it to an empty object
                        guild.extra.messageRedirects ??= {}; //if guild.extra.messageRedirects is undefined, set it to an empty object
                        if(_.isArray(guild.extra.messageRedirects)) guild.extra.messageRedirects = {};
                        guild.extra.messageRedirects[msg.channelId] = {to: msgsplit[4]};
                        GuildData.setGuildById(msg.guild.id,guild);
                        msg.reply("done");
                    }
                }
            } else if(!isNaN(parseInt(msgsplit[2])) && msgsplit[3] == "from" && !isNaN(parseInt(msgsplit[4]))) {
                let channel = await clientBee.channels.fetch(msgsplit[4]);
                if(channel) {
                    let guild = await GuildData.getGuildById(msg.guild.id);
                    if(guild) {
                        guild.extra ??= {}; //if guild.extra is undefined, set it to an empty object
                        guild.extra.messageRedirects ??= {}; //if guild.extra.messageRedirects is undefined, set it to an empty object
                        if(_.isArray(guild.extra.messageRedirects)) guild.extra.messageRedirects = {};
                        guild.extra.messageRedirects[msg.channelId] = {to: msgsplit[2]};
                        GuildData.setGuildById(msg.guild.id,guild);
                        msg.reply("done");
                    }
                }
            } else {
                msg.reply("Invalid arguments. Try `katze redirect <channel> to <channel>` or `katze redirect <channel> from <channel>` \n Got: "+msgsplit.join(" "));

                // Check what arguments  are wrong and hint to the user
            }
            if(!isNaN(parseInt(msgsplit[3])) && msgsplit[2] == "remove") {
                let channel = await clientBee.channels.fetch(msgsplit[3]);
                if(channel) {
                    let guild = await GuildData.getGuildById(msg.guild.id);
                    if(guild) {
                        if(guild.extra && guild.extra.messageRedirects) {
                            if(guild.extra.messageRedirects[msg.channelId]) {
                                delete guild.extra.messageRedirects[msg.channelId];
                                GuildData.setGuildById(msg.guild.id,guild);
                                msg.reply("done");
                            }
                        }
                    }
                }
            }
            if(!isNaN(parseInt(msgsplit[3])) && msgsplit[2] == "list") {
                let guild = await GuildData.getGuildById(msg.guild.id);
                if(guild) {
                    if(guild.extra && guild.extra.messageRedirects) {
                        let list = Object.keys(guild.extra.messageRedirects).map((v)=>{
                            return v + " -> " + guild.extra.messageRedirects[v].to;
                        });
                        msg.reply(list.join("\n"));
                    }
                }
            }
            if(isNaN(parseInt(msgsplit[3])) && msgsplit[2] == "to") {
                msg.reply("Channel ID must be a number");
            }
            
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","understood","me"],
        async cmd(msg:Discord.Message){
            msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze add erole"],
        async cmd(msg:Discord.Message,user,guild){
            if(guild) {
                var role = msg.content.replace("!katze add erole ","");
                guild.everyoneRoles.push(role);
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze remove erole"],
        async cmd(msg:Discord.Message,user,guild){
            if(guild) {
                var role = msg.content.replace("!katze remove erole ","");
                guild.everyoneRoles = guild.everyoneRoles.filter((v)=>{return v != role});
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze list eroles"],
        async cmd(msg:Discord.Message,user,guild){
            if(guild) {
                msg.reply(guild.everyoneRoles.join(", "));
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze set welcome message"],
        async cmd(msg:Discord.Message,user,guild){
            if(guild) {
                guild.welcomeMessage = msg.content.replace("!katze set welcome message ","");
                guild.welcomeMessageEnabled = true;
                GuildData.setGuildById(msg.guild.id,guild);
                msg.reply("done");
            }
        }
    },
    {
        ownerlimited:true,
        triggerwords:["!katze","set","welcome","channel"],
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
        triggerwords:["!katze","set","welcome","enable"],
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
        triggerwords:["!katze","set","welcome","disable"],
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