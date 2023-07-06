import { ICommand, TypeOfCmd } from "./ICommand";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { getRandom, getMentions } from './command.helper';
import { DBHelper } from "../db.helper";
import { MessageActionRow, MessageButton } from "discord.js";
import { EveryoneCommands } from "./EveryoneCommands";
import { MasterCommands } from "./MasterCommands";
import _ from "lodash";
import { Actions, Userdata } from "../Helper/Userdata";
import { LogLevel, Logging } from 'supernode/Base/Logging';
import { RPG } from "../RPG/BaseRPG";
import { CanvasGradient, CanvasPattern, createCanvas } from "canvas";
import Color from "color";
import {DivorceRequest} from "../Data/DivorceRequest";
import { GuildData } from "../Helper/GuildData";
import { DiscordStringExt } from "../Helper/StringExt";

export let TrustedCommands: ICommand[] = [
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        isHalting: true,
        triggerwords: ["!katze", "how", "many", "actions"],

        async cmd(msg: Discord.Message) {
            msg.reply("There are " +
                TrustedCommands.filter(v => { return v.typeofcmd == TypeOfCmd.Action }).length + " commands.");
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerwords: ["!katze", "what", "are", "actions", "there"],
        async cmd(msg: Discord.Message) {
            msg.reply("There are '" +
                TrustedCommands.filter(v => { return v.typeofcmd == TypeOfCmd.Action }).map(v => { return v.messagecontent }).join("','") + "'.");
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        isHalting: true,
        triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "!katze help"),
        async cmd(msg: Discord.Message) {
            msg.reply("MasterCmds: '" +
                MasterCommands.filter(v => { return v.messagecontent != undefined })?.map(v => { return "**" + v.messagecontent + "**" }).join("','") + "'.\n" +
                MasterCommands.filter(v => { return v.triggerwords != undefined })?.map(v => { return "**" + v.triggerwords + "**" }).join("','") + "'.\n" +
                "TrustedCmds: '" +
                TrustedCommands.filter(v => { return v.messagecontent != undefined })?.map(v => { return "**" + v.messagecontent + "**" }).join("','") + "'.\n" +
                TrustedCommands.filter(v => { return v.triggerwords != undefined })?.map(v => { return "**" + v.triggerwords + "**" }).join("','") + "'.\n");
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "!!katze profile"),
        async cmd(msg: Discord.Message, user) {
            try {
                var mentions = getMentions(msg.content);
                if (mentions.length == 1) user = await Userdata.getUser(mentions[0])
                let guild = await GuildData.getGuildById(msg.guild.id)
                
                var canvas = createCanvas(720,380);
                var ctx = canvas.getContext('2d');
                
                ctx.fillStyle=ctx.createLinearGradient(0,0,720,460);
                //ctx.fillStyle.addColorStop(0,"#2fb16c")
                ctx.fillStyle.addColorStop(0,Color(user.hexcolor).lighten(0.1).saturate(1.1).hex())
                //ctx.fillStyle.addColorStop(1,"#68df71")
                ctx.fillStyle.addColorStop(1,Color(user.hexcolor).darken(0.2).hex())
                ctx.fillRect(0,0,720,460)
                
                let mult=80;
                ctx.font = mult+'px Impact'
                ctx.fillStyle="black"
                while(ctx.measureText(DiscordStringExt.unstyle(user.tag)).width>=710){
                    mult-=5
                    ctx.font = mult+'px gg-sans'
                }
                ctx.fillText(DiscordStringExt.unstyle(user.tag), 10, 85)

                ctx.font = '24px Mono'
                ctx.fillStyle="black"
                function writeStat(pos:number,text:string,val:number) {
                    ctx.fillText(text+" "+val.toString(), 20, 180+pos*27);
                }
                writeStat(0,"STR",user.rpg.str)
                writeStat(1,"AGI",user.rpg.agi)
                writeStat(2,"VIT",user.rpg.vit)
                writeStat(3,"INT",user.rpg.int)
                writeStat(4,"DEX",user.rpg.dex)
                writeStat(5,"LUK",user.rpg.luk)

                ctx.font = '24px gg-sans bold'
                ctx.fillText("("+Math.floor(RPG.expToNextLevel(user.rpg)/RPG.nextLevelExpRequired(user.rpg)*100)+"% until lvlup)", 460, 133);
                ctx.font = '44px gg-sans bold'
                ctx.fillText("Lvl "+user.rpg.level, 280, 133);
                ctx.font = '16px gg-sans bold'
                ctx.fillText("SKILLPOINTS "+user.rpg.skillpoints, 280, 157);

                ctx.font = '28px gg-sans bold'
                ctx.fillStyle="black bold"
                ctx.textAlign="left";
                ctx.fillText("Actions", 280, 200);
                ctx.fillText("Sent", 480, 200);
                ctx.fillText("Got", 620, 200);
                ctx.strokeText("Actions", 280, 200);
                async function writeAction(pos:number,action:Actions,text:string) {
                    ctx.fillText(text, 280, 200+(pos+1)*30);
                    ctx.fillText((await user.getSent(action)).toString(), 480, 200+(pos+1)*30);
                    ctx.fillText((await user.getReceived(action)).toString(), 620, 200+(pos+1)*30);
                }

                await writeAction(0,"hug","Hugs")
                await writeAction(1,"pats","Pats")
                await writeAction(2,"cuddle","Cuddles")
                await writeAction(3,"nom","Noms")


                ctx.resetTransform()

                ctx.font = '30px gg-sans'
                ctx.rotate(0.1)
                ctx.fillStyle="yellow"
                ctx.fillText('Awesome!', 50, 100)
                ctx.fillStyle="black"
                ctx.strokeText('Awesome!', 50, 100)
                
                // 

                let reply = (user.marriedTo.length>=1?user.name+" ist verheiratet mit "+(await Promise.all(user.marriedTo.map(async (v) => { 
                    try {return (await msg.guild.members.fetch(v)).displayName;}
                    catch(e) {return "???";}
                 }))).join(", ")+" 💍❤️":"");
                msg.reply({
                            content:(reply?reply:"Profile"),
                            files:[new Discord.MessageAttachment(canvas.createPNGStream(), 'temp.png')]
                })
            } catch (e) {
                Logging.log("Could not create User Profile", LogLevel.Verbose);
                console.log(e)
            }
        }
    },
    // Command to leave timeout
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "leavetimeout"),
        async cmd(msg: Discord.Message, user) {
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "emoji vote "),
        async cmd(msg: Discord.Message) {
            if (msg.attachments.size == 1) {
                var atta = msg.attachments.first();
                msg.delete();
                if (atta.height == atta.width) {
                    var votemsg = await msg.channel.send({ 
                        content: "<@!" + msg.member.id + "> would like to add :" + _.words(msg.content)[2] + ":", 
                        files: [atta.url]
                    })
                    votemsg.react("👍");
                    votemsg.react("👎");

                    
                    var ej=[]
                    var evk= "emojivotes";
                    if(await db.exists(evk))
                    ej=await db.get(evk)
                    
                    //ej.push({msgid:votemsg.id,finishes});
                    
                    
                    var repliedmsg = await msg.channel.send("`Vote started, and will conclude in 24hours! It will then automatically be added when at least 5 people upvoted.\nGood luck! (This info disappears in 60s.)`")
                    setTimeout(() => { repliedmsg.delete() }, 60000)
                    
                } else {
                    var repliedmsg = await msg.reply("Please fix the proportion of the moji you do like to add! (It needs to be 1:1)")
                    setTimeout(() => { repliedmsg.delete() }, 10000)
                }
            } else {
                var repliedmsg = await msg.reply("You need to have an image to use for the emoji!")
                setTimeout(() => { repliedmsg.delete() }, 10000)
            }
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, messagecontent: "marry",
        async cmd(msg: Discord.Message, user : Userdata) {
            if(!msg.mentions.repliedUser) return;

            let links = [
                "https://c.tenor.com/aJjnVhJ1k_0AAAAd/melamar-geisha.gif",
                "https://c.tenor.com/NK-CNqOr5TwAAAAC/hu-tao-marry.gif",
                "https://c.tenor.com/IcwN28AtBVgAAAAC/marry-me-anime.gif"
            ]

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Love is in the air!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} proposes to ${MessageHelper.getRepliantsVisibleName(msg)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)])

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('accept-marriage')
                        .setLabel('I DO!')
                        .setStyle('SUCCESS'),
                ).addComponents(
                    new MessageButton()
                        .setCustomId('reject-marriage')
                        .setLabel('Reject')
                        .setStyle('DANGER'),
                );

            if(!user.extra.requestedMarriageTo) user.extra.requestedMarriageTo = [];
            user.extra.requestedMarriageTo.push(msg.mentions.repliedUser.id);
            user.extra.requestedMarriageTo=_.uniq(user.extra.requestedMarriageTo);
            user.save();

            //Get the user data of the person who is being proposed to
            var targetUser = await Userdata.getUser(msg.mentions.repliedUser.id);
            if(!targetUser.extra.requestedMarriageFrom) targetUser.extra.requestedMarriageFrom = [];
            targetUser.extra.requestedMarriageFrom.push(msg.member.id);
            targetUser.extra.requestedMarriageFrom=_.uniq(targetUser.extra.requestedMarriageFrom);
            targetUser.save();

            msg.reply({ embeds: [exampleEmbed], components: [row] });
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "divorce",
        async cmd(msg: Discord.Message, user : Userdata) {
            if(!msg.mentions.repliedUser) return;

            if(!user.marriedTo.includes(msg.mentions.repliedUser.id)) {
                msg.reply("You are not married to that person!")
                return;
             }

            let links = [
                "https://c.tenor.com/zr2rab_BRioAAAAC/schtroumpf-peyo.gif"
            ]

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('OH NO!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} wants to divorce ${MessageHelper.getRepliantsVisibleName(msg)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)])

            user.extra.requestedDivorceFrom= new DivorceRequest(msg.member.id,msg.mentions.repliedUser.id)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('accept-divorce-'+user.extra.requestedDivorceFrom.id)
                        .setLabel('Confirm')
                        .setStyle('SUCCESS'),
                ).addComponents(
                    new MessageButton()
                        .setCustomId('reject-divorce-'+user.extra.requestedDivorceFrom.id)
                        .setLabel('Deny')
                        .setStyle('DANGER'),
                );
            
            user.save();

            msg.reply({ embeds: [exampleEmbed], components: [row] });

        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "bbtext",
        async cmd(msg: Discord.Message) {

            let links = [
                "https://c.tenor.com/zr2rab_BRioAAAAC/schtroumpf-peyo.gif"
            ]

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('OH NO!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} wants to divorce ${MessageHelper.getRepliantsVisibleName(msg)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)])

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('bbtext')
                        .setLabel('BBText')
                        .setStyle('SUCCESS'),
                );
            msg.reply({ embeds: [exampleEmbed], components: [row] });

        }
    },
]

async function addActionToStatistic(action: ActionInfo, msg: Discord.Message) {
    // Add the action to the statistics of the user
    var user = await Userdata.getUser(msg.member.id);
    (await user.addSent(action.key,1)).save();

    // Add the action to the statistics of the target
    if (!!msg.mentions && !!msg.mentions.repliedUser) {
        try {
            var receiver = await Userdata.getUser(msg.mentions.repliedUser.id);
            (await receiver.addReceived(action.key,1)).save();
        } catch(e) {
            Logging.log(action.target+ "is not a valid user id");
        }
    }
    if(!!action.target) {
        try {
            var receiver = await Userdata.getUser(action.target);
            (await receiver.addReceived(action.key,1)).save();
        } catch(e) {
            Logging.log(action.target+ "is not a valid user id");
        }
    }
}

async function simpleReactEmbed(
    links: { link: string, template?: string[], header?: string[], special?: any }[],
    msg: Discord.Message,
    action: ActionInfo) {
        //console.log(action)
        
        var target = await msg.guild.members.fetch(action.target);
        let targetVisName = target?.user?.username ?? target?.user?.tag ?? MessageHelper.getRepliantsVisibleName(msg);

        //console.log(msg.guild.name)
        //console.log(targetVisName)

        var fields = {
            sender: "<@!"+msg.member.id+">",
            repliant: targetVisName,
            action
        }
        //console.log(fields.repliant)
        
        var header = "<%= _.upperFirst(action.singular) %>!"
        var template = "<%= sender %> <%= action.plural %> <%= repliant %>!" 
        
        
        if (action.defaultHeader) 
            header = action.defaultHeader
        if (action.defaultTemplate)
            template = action.defaultTemplate
            if(!!action.noTargetTemplate)
            if(targetVisName=="noone?") {
                template = action.noTargetTemplate    
            }

        var linkId = Math.floor(Math.random() * links.length);
        var link = links[linkId].link

        if (links[linkId].template) template = getRandom(links[linkId].template);
        if (links[linkId].header) header = getRandom(links[linkId].header);

        return new Discord.MessageEmbed()
            .setColor('#FFD35D')
            .setTitle(_.template(header)(fields))
            .setDescription(_.template(template)(fields))
            .setImage(link);
}

interface ActionInfo {
    key: string;
    singular: string;
    plural: string;
    defaultTemplate?: string;
    noTargetTemplate?: string;
    defaultHeader?: string;
    target?: string;
}

async function defaultReactionHandler(msg: Discord.Message, action: ActionInfo, defaultGifs: { link: string, template?: string[], header?: string[], special?: any }[]) {
    //var gifkey="actionGIFs::"+action.key;
    //var links:{link:string,template:string,special:any}[]=[];
    /**if(db.exists(gifkey)){
        var gifs = db.get(gifkey)
    } else {
        db.put(gifkey,defaultGifs)
    }*/

    msg.channel.send({ embeds: [await simpleReactEmbed(defaultGifs, msg, action)] });

    addActionToStatistic(action, msg);
}