import { ICommand, TypeOfCmd } from "./ICommand";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { DBHelper } from "../db.helper";
import { Logging } from "supernode/Base/Logging";
import { RPG, RPGData } from "../RPG/BaseRPG";
import _ from "lodash";
import { Userdata } from "../Helper/Userdata";
import { GuildData } from "../Helper/GuildData";
//import { getUser, setUser } from "./command.helper";

var randomUserIdCache:{time:number,id:string}[] = []

export let EveryoneCommands : ICommand[] = [
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg,userdata,guilddata) {
            if(msg.author.bot) return;
            
            function replaceNonCommonLetter()
            {
                // Replace all occurences of letters like * & % $ § with nothing
                // Replace all occurences of letters like ä ö ü with a o u
                // Replace all occurences of letters like ß with ss
                // Replace all occurences of letters like 1 2 3 4 5 6 7 8 9 0 with nothing

                // Create Hash of special signs and their replacements
                

            
                
                
            }
            
            if(msg.content.toLowerCase()=="nh") {msg.delete();return;}
            if(msg.content.toLowerCase().includes("*nh*")) {msg.delete();return;}
            if(msg.content.toLowerCase().includes("_nh_")) {msg.delete();return;}
            if(msg.content.toLowerCase().includes(" nh ")) {msg.delete();return;}
            if(msg.content.toLowerCase().includes(" nh")) {msg.delete();return;}
            if(msg.content.toLowerCase().includes("nh ")) {msg.delete();return;}



            //Get user data
            var userdata = await Userdata.getUser(msg.member.id);
            userdata.msgs++;

            /** Filter out all users that have passed the 5s mark from the cache */
            randomUserIdCache = randomUserIdCache.filter(e=>Date.now()-e.time<5000);

            var cachedUser=randomUserIdCache.find(e=>e.id==userdata.id);
            /** If the user isn't in the list, set a new timer, and also add EXP */
            if(!cachedUser) {
                userdata.rpg=RPG.addExp(userdata.rpg,7*Math.random());
                randomUserIdCache.push({id:userdata.id,time:Date.now()});
            }

            guilddata.everyoneRoles.forEach(e=>
                {
                    if(!msg.member.roles.cache.has(e)) {
                        msg.member.roles.add(e);
                    }
                }
            );

            userdata.save();
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        canHalt:true,
        async cmd(msg,user,guild) {
            if(msg.author.bot) return false;

            if(guild.extra.messageRedirects[msg.channelId]) {
                //console.log("A message was sent in a redirect channel")
                var redirectChannel = clientBee.channels.cache.get(guild.extra.messageRedirects[msg.channelId].to);
                if(redirectChannel && redirectChannel.isText()) {
                    msg.channel.send("Deine Nachricht wurde an die aktiven mods weitergeleitet kleinen moment bitte :3")
                    var embed = new Discord.MessageEmbed();
                    embed.setAuthor({name:user.tag, iconURL: msg.member.avatarURL({dynamic: true, size: 512})});
                    embed.setDescription(msg.content);
                    embed.setColor("RANDOM");
                    embed.setTimestamp(msg.createdTimestamp);
                    redirectChannel.send({embeds:[embed]});
                    msg.delete();
                    return true;
                }
            }

            return false;
        }
    },
]