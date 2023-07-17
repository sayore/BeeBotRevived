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
import { MessageData } from "../Helper/MessageData";
//import { getUser, setUser } from "./command.helper";

var randomUserIdCache:{time:number,id:string}[] = []

export let EveryoneCommands : ICommand[] = [
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg,userdata,guilddata) {
            if(msg.author.bot) return;

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
                    //check if role exists
                    if(!msg.guild.roles.cache.has(e)) {
                        //remove role from list
                        guilddata.everyoneRoles = guilddata.everyoneRoles.filter(e=>e!=e);
                        return;
                    }
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
                    msg.channel.send("Deine Nachricht wurde an die aktiven mods weitergeleitet kleinen moment bitte!")
                    var embed = new Discord.MessageEmbed();
                    embed.setAuthor({name:user.tag });
                    embed.setDescription(msg.content);
                    embed.setColor("RANDOM");
                    embed.setTimestamp(msg.createdTimestamp);
                    redirectChannel.send({embeds:[embed]});

                    var acceptmsg = await redirectChannel.send("Reagiere mit ✅ um den User zu akzeptieren, 🟡 um den User zu trialn(benötigt 2 Upvotes), und 🚫 um die Bewerbung abzulehnen.")
                    acceptmsg.react("✅");
                    acceptmsg.react("🟡");
                    acceptmsg.react("🚫");

                    var msgData = await MessageData.getMessageById(acceptmsg.id);
                    console.log(acceptmsg.id)
                    _.set(msgData,"extra",{user:msg.author.id,state:"pending"});
                    _.set(msgData,"extra.messageType","application");
                    _.set(msgData,"extra.trialVotes",0);
                    _.set(msgData,"extra.applyingMember",msg.member.id);
                    msgData.save();

                    msg.delete();
                    return true;
                }
            }

            return false;
        }
    },
]