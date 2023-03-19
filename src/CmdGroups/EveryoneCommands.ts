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
            
            function sendNhMsg() {
                

                msg.author.send("Statt nh benutz bitte vernpnftige Wörter wie z.B. nichts, nee, niente, garnichts, nichts geht, und so weiter und so fort etc. \n Danke :3")
                msg.author.send("Hier ist auch einmal deine alte Nachricht damit du sie nicht neu schreiben musst: ")
                msg.author.send(msg.content)
                msg.author.send("Lang lebe meoworii :3")

                console.log("User "+msg.author.username+" sent a message with nh in it. Message: "+msg.content)
            }

            if(msg.content.toLowerCase()=="nh") {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("*nh*")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("_nh_")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n....h")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n...h")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n..h")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("n....h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("n...h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("n..h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("n.h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n.h")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n.h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n..h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" n...h ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" nh ")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(" nh")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes(":nh:")) {sendNhMsg();msg.delete();return;}
            if(msg.content.toLowerCase().includes("nh ")) {sendNhMsg();msg.delete();return;}
            function ContainsNH(str)
            {
                if(str === "nh") return true;
                let edge_characters = [" ", ".", ",", ":"];
                let edge_characters_piece = `(?<=[${edge_characters.join("|\\")}])`;
                return str.match(new RegExp(`${edge_characters_piece}nh|nh${edge_characters_piece}`)) != null;
            }
            if(ContainsNH(msg.content.toLowerCase())) {sendNhMsg();msg.delete();return;}

            

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