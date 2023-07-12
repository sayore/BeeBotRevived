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
        userlimitedids:["100656035718516736"],
        always:true,
        async cmd(msg,user,guild) {
            if(msg.author.bot) return false;
            try{
                Logging.log("Check role Mitglied","MASTER");
                if(!msg.member.roles.cache.has("1074000760012029962")) {
                    await msg.member.roles.add("1074000760012029962");
                }
            } catch(e) {
                Logging.log(e,"MASTER")
            }
            try {
                Logging.log("Check role MEOW","MASTER");
                if(!msg.member.roles.cache.has("1073732532518006837")) {
                    await msg.member.roles.add("1073732532518006837");
                }
            } catch(e) {
                Logging.log(e,"MASTER")
            }

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        userlimitedids:["100656035718516736"],
        always:true,
        async cmd(msg,user,guild) {
            
            let chData = await GuildData.getChannelData(guild.id, msg.channel.id);
            Logging.log(JSON.stringify(chData));
            chData.msgCount??=0;
            chData.msgCount+=1;

            GuildData.setChannelData(guild.id, msg.channel.id, chData);

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg,user,guild) {
            
            let chData = await GuildData.getChannelData(guild.id, msg.channel.id);
            
            Logging.log(chData.imageVote,"MASTER")
            if(chData.imageVote) {
                //Add Emotes to message if image is present(check embeds)
                Logging.log(msg.attachments,"MASTER")
                Logging.log(msg.embeds,"MASTER")
                if(msg.attachments.size>0) {
                    //Check if message is in a channel with imageVote enabled
                    if(chData.imageVote) {
                        //Add Emotes to message
                        await msg.react("👍");
                        await msg.react("👎");
                    }
                }
            }

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        userlimitedids:["100656035718516736"],
        triggerfunc(msg) {
            return msg.content.startsWith("!katze ImageVote true");
        },
        async cmd(msg,user,guild) {
            
            let chData = await GuildData.getChannelData(guild.id, msg.channel.id);
            Logging.log(JSON.stringify(chData));
            chData.imageVote??=true;
            chData.imageVote=true;

            GuildData.setChannelData(guild.id, msg.channel.id, chData);

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        userlimitedids:["100656035718516736"],
        triggerfunc(msg) {
            return msg.content.startsWith("!katze ImageVote false");
        },
        async cmd(msg,user,guild) {
            
            let chData = await GuildData.getChannelData(guild.id, msg.channel.id);
            Logging.log(JSON.stringify(chData));
            chData.imageVote??=false;
            chData.imageVote=false;

            GuildData.setChannelData(guild.id, msg.channel.id, chData);

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        userlimitedids:["302050872383242240"],
        always:true,
        async cmd(msg,user,guild) {
            Logging.log(msg.type,"DISBOARD");
            //Get reply message
            
            
            
            //Logging.log(msg.nonce,"DISBOARD2");
            //Logging.log(msg.channel.messages.cache.get(msg.nonce.toString()),"DISBOARD2");
            //Logging.log(msg,"DISBOARD3");
            //Logging.log(msg.author,"DISBOARD4");
            //Logging.log(msg.components,"DISBOARD5");
            //Logging.log(msg.flags,"DISBOARD6");
            //Logging.log(msg.toJSON(),"DISBOARD6");
                
        
            if (msg.type !== "APPLICATION_COMMAND") return;

            Logging.log(msg.interaction.commandName)
        
            // if so then you can access the user who triggered the command with
            Logging.log(msg.interaction.user);


            Logging.log(msg.embeds,"DISBOARD1");

            return false;
        }
    },
    {
        typeofcmd:TypeOfCmd.Information,
        always:true,
        async cmd(msg,userdata,guilddata) {
            if(msg.author.bot) return;
            
            function sendNhMsg() {
                
                
                msg.author.send("**______________________________________________________________________**")
                msg.author.send("Statt nh benutz bitte vernünftige Wörter wie z.B. nichts, nee, niente, garnichts, nichts geht, und so weiter und so fort etc. \n Danke :3")
                msg.author.send("Hier ist auch einmal deine alte Nachricht damit du sie nicht neu schreiben musst: ")
                msg.author.send(msg.content)
                msg.author.send("**Lang lebe meoworii :3**")

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
            function ContainsNH(lookfor,str)
            {
                if(str === lookfor) return true;
                let edge_characters = [" ", ".", ",", ":"];
                let edge_characters_piece = `(?<=[${edge_characters.join("|\\")}])`;
                return str.match(new RegExp(`${edge_characters_piece}${lookfor}|${lookfor}${edge_characters_piece}`)) != null;
            }
            if(ContainsNH("nh",msg.content.toLowerCase())) {sendNhMsg();msg.delete();return;}
            if(ContainsNH("nd",msg.content.toLowerCase())) {sendNhMsg();msg.delete();return;}
            if(ContainsNH("nt",msg.content.toLowerCase())) {sendNhMsg();msg.delete();return;}

            

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