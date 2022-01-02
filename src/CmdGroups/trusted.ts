import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { getRandom, getMentions } from './command.helper';
import { DBHelper } from "../db.helper";
import { MessageActionRow, MessageButton } from "discord.js";
import { EveryoneCommands } from "./everyone";
import { MasterCommands } from "./master";
import _ from "lodash";
import { getUser } from "../Helper/user";
import { LogLevel, Logging } from 'supernode/Base/Logging';
import { RPG } from "../RPG/rpg";


export let TrustedCommands: ICommand[] = [
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        isHalting: true,
        triggerwords: ["bee", "how", "many", "actions"],

        async cmd(msg: Discord.Message) {
            msg.reply("There are " +
                TrustedCommands.filter(v => { return v.typeofcmd == TypeOfCmd.Action }).length + " commands.");
        }
    },
    {
        messagecontent: "hello bee",
        async cmd(msg: Discord.Message) {
            switch (msg.member.id) {
                case "562640877705756690":
                    msg.reply("Hi master uwu");
                    break;
                case "465583365781717003":
                    msg.reply(getRandom(["hello cutie kaly <3", "hey :3", "top1 best cutie", "hey kaly <3", "cutie ❤️", "how you doin kaly <:lunalove:915990988177162280>"]));
                    break;
                case "902232441748615201":
                    msg.reply(getRandom(["Hi master uwu", "Luna uwu"]));
                    break;
                case "387372763171520513": //Pan
                    msg.reply(getRandom(["Hey pan *blushes*", "Good to see you pan <:yay:855047723118886912>"]));
                    break;
                case "662209384482603019": //Tato
                    msg.reply(getRandom([
                        "Hey potato *blushes*",
                        "Hi potato <:yay:855047723118886912>",
                        "Glad you are around ryu!",
                        "*hugs rin* heya! :3"
                    ]));
                    break;
                default:
                    msg.reply(getRandom(["Hi!", "Heya! <:yay:855047723118886912>", "Hey " + msg.member.displayName + "!", , "Heya " + msg.member.displayName + "! <:yay:855047723118886912>"]));
            }
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerwords: ["bee", "what", "are", "actions", "there"],
        async cmd(msg: Discord.Message) {
            msg.reply("There are '" +
                TrustedCommands.filter(v => { return v.typeofcmd == TypeOfCmd.Action }).map(v => { return v.messagecontent }).join("','") + "'.");
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        isHalting: true,
        triggerwords: ["bee", "help"],
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
        triggerwords: ["i love", "bee"],
        async cmd(msg: Discord.Message) {
            msg.reply(getRandom(["	☜(⌒▽⌒)☞", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "(〃￣ω￣〃ゞ"]));
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerwords: ["bee", "profile"],
        async cmd(msg: Discord.Message, user) {
            try {
                var mentions = getMentions(msg.content);
                if (mentions.length == 1) user = await getUser(mentions[0])
                msg.reply("\`" + user.tag + " -> Lvl " + user.rpg.level + "(" + Math.floor(RPG.expToNextLevel(user.rpg)) + "/" + RPG.getExpNeeded(user.rpg) + " EXP)" + "\`\n" +
                    "\`" + "       STR AGI VIT INT DEX LUK      " + "\`\n" +
                    "\`" + "       " + user.rpg.str.toString().padEnd(3, " ") + " " + user.rpg.agi.toString().padEnd(3, " ") + " " + user.rpg.vit.toString().padEnd(3, " ") + " " + user.rpg.int.toString().padEnd(3, " ") + " " + user.rpg.dex.toString().padEnd(3, " ") + " " + user.rpg.luk.toString().padEnd(3, " ") + "      " + "\`\n" +
                    "\`" + "            Sent        Received    " + "\`\n" +
                    "\`------------------------------------\`\n" +
                    "\`" + "Hugs        " + (await user.getSent("hugs")).toString().padEnd(12, " ") + (await user.getReceived("hugs")).toString().padEnd(12, " ") + "\`\n" +
                    "\`" + "Cuddles     " + (await user.getSent("cuddles")).toString().padEnd(12, " ") + (await user.getReceived("cuddles")).toString().padEnd(12, " ") + "\`\n" +
                    "\`" + "Pats        " + (await user.getSent("pats")).toString().padEnd(12, " ") + (await user.getReceived("pats")).toString().padEnd(12, " ") + "\`\n" +
                    "\`" + "Noms        " + (await user.getSent("noms")).toString().padEnd(12, " ") + (await user.getReceived("noms")).toString().padEnd(12, " ") + "\`\n" +
                    "\`" + "?           " + (await user.getSent("goodbees")).toString().padEnd(12, " ") + (await user.getReceived("goodbees")).toString().padEnd(12, " ") + "\`");
            } catch (e) {
                Logging.log("Could not create User Profile", LogLevel.Verbose);
            }
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "hug"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" :undefined)
            defaultReactionHandler(msg, { target: mention, key: "hug", singular: "hug", plural: "hugs" }, [
                { link: "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif" },
                { link: 'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif' },
                { link: "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif" },
                { link: "https://c.tenor.com/0PIj7XctFr4AAAAC/a-whisker-away-hug.gif" },
                { link: "https://c.tenor.com/2lr9uM5JmPQAAAAC/hug-anime-hug.gif" },
                { link: "https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif" },
                { link: "https://c.tenor.com/IwRSZxi6vzkAAAAC/hug-hugs.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "boop"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "boop", singular: "boop", plural: "boops" }, [
                { link: "https://c.tenor.com/l5XjHcppGN0AAAAd/boop.gif" },
                { link: "https://c.tenor.com/B1ohHuPJIpgAAAAS/anime-cuteness.gif" },
                { link: "https://c.tenor.com/YYoFAH8B7GAAAAAd/anime-your-face-is-cute.gif" },
                { link: "https://c.tenor.com/YowICbg6ApcAAAAC/aww-hugging.gif" },
                { link: "https://c.tenor.com/HZWeNnmcbBYAAAAS/cat-boop.gif" },
                { link: "https://c.tenor.com/RmQElPHERIoAAAAC/boop-anime.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "sex"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "sex", singular: "sex", plural: "sexes" }, [
                { link: "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif" },
                { link: "https://c.tenor.com/XCLEsDZBeBQAAAAC/kissxsis-anime.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "kiss"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "kiss", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif" },
                { link: "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif" },
                { link: "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif" },
                { link: "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "kiss cheek"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "kisscheek", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif" },
                { link: "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "cuddle"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "cuddle", singular: "cuddle", plural: "cuddles" }, [
                { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "holdhands"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "handhold", singular: "Handholding", plural: "handholds" }, [
                { link: "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif" },
                { link: "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif" },
                { link: "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "pat"),
        async cmd(msg: Discord.Message) {
            //***happynoises are filling the room***
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, { target: mention, key: "pats", singular: "Pats", plural: "pats" }, [
                { template: ["PATPATPATPATPAT"], special: {}, link: "https://c.tenor.com/tYS5DBIos-UAAAAS/kyo-ani-musaigen.gif" },
                { template: ["PATPATPATPATPAT?"], special: {}, link: "https://c.tenor.com/EtvotzSToyMAAAAd/petra-rezero.gif" },
                { template: ["PATPATPATPATPAT!"], special: {}, link: "https://c.tenor.com/rc8PwWHaV9gAAAAC/headpat-patpat.gif" },
                { template: ["PATPATPATPATPAT MAAAI"], special: {}, link: "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif" },
                { template: ["PATPATPATPATPAT"], special: {}, link: "https://c.tenor.com/0XzZ4R16RaQAAAAC/anime-smile.gif" },
                { template: ["PATPATPATPATPAT *headrub*"], special: {}, link: "https://c.tenor.com/QAIyvivjoB4AAAAC/anime-anime-head-rub.gif" },
                { template: ["PATPATPATPATPAT CUTE"], special: {}, link: "https://c.tenor.com/2oOTpioZ_j4AAAAC/pet-cute.gif" },
                { template: ["PATPATPATPATPAT ANIME"], special: {}, link: "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "hide"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "hide", singular: "hide", plural: "hides",
                defaultTemplate: "<%= sender %> <%= action.plural %> from <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif" },
                { link: "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif" },
                { link: "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "blush"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "blush", singular: "blush", plural: "blushes",
                defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/wwxHnJqUNEMAAAAC/anime-blush.gif" },
                { link: "https://c.tenor.com/M7wcdD0eujYAAAAd/anime-looking.gif" },
                { link: "https://c.tenor.com/2cWyWrf4ucAAAAAS/cyan-hijirikawa-show-by-rock.gif" },
                { link: "https://c.tenor.com/Z4l7tKpmHXsAAAAC/anime-blush-cute.gif" },
                { link: "https://c.tenor.com/OWVyLN0FS_MAAAAC/morgiana-anime.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "love"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "love", singular: "love", plural: "loves",
                defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/1rEO6m7rWWQAAAAC/i-love-you-love.gif" },
                { link: "https://c.tenor.com/_2KihRhrHD8AAAAC/girls-heart.gif" },
                { link: "https://c.tenor.com/B-QkRiYZPZUAAAAC/cinderella-girls-anime.gif" },
                { link: "https://c.tenor.com/YYHukkdJkasAAAAC/anime-heart.gif" },
                { link: "https://c.tenor.com/hT2lCppV4tIAAAAC/anime-i-love-you.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "nom"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? "<@!" + mentions + ">" : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "nom", singular: "nom", plural: "noms",
                defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/9dOzFGFZxnoAAAAM/bite-anime.gif" },
                { link: "https://c.tenor.com/djDaxKCZXpwAAAAM/chomp-cute.gif" },
                { link: "https://c.tenor.com/SXuvQ7XzeD0AAAAM/cake-birthday.gif" },
                { link: "https://c.tenor.com/NUvfL_4DmHoAAAAM/yum-cute.gif" },
                { link: "https://c.tenor.com/i9UwyNJiHCQAAAAM/nom-anime.gif" },
                { link: "https://c.tenor.com/HO71nB7fQdkAAAAM/anime-zombielandsaga.gif" }
            ])
        }
    },
    {
        messagecontent: "good bee",
        async cmd(msg: Discord.Message) {
            msg.reply("yay \(◦'⌣'◦)/.");

            var action = "goodbee";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(_.lowerCase(msg.content), "emoji vote "),
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
        async cmd(msg: Discord.Message) {

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
            msg.reply({ embeds: [exampleEmbed], components: [row] });

        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "divorce",
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
                        .setCustomId('accept-divorce')
                        .setLabel('Yes')
                        .setStyle('SUCCESS'),
                ).addComponents(
                    new MessageButton()
                        .setCustomId('reject-divorce')
                        .setLabel('NOOO')
                        .setStyle('DANGER'),
                );
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

function addActionToStatistic(action: ActionInfo, msg: Discord.Message) {
    DBHelper.increase(db, "action::" + action.key + "sSent::" + msg.member.id + "", 1);
    if (msg.mentions && msg.mentions.repliedUser)
        DBHelper.increase(db, "action::" + action.key + "sReceived::" + (action.target ? action.target : msg.mentions.repliedUser.id), 1);
}

function simpleReactEmbed(
    links: { link: string, template?: string[], header?: string[], special?: any }[],
    msg: Discord.Message,
    action: ActionInfo) {
    var fields = {
        sender: MessageHelper.getSendersVisibleName(msg),
        repliant: (!!action.target ? action.target : MessageHelper.getRepliantsVisibleName(msg)),
        action
    }

    var header = "<%= action.singular %>!"
    var template = "<%= sender %> <%= action.plural %> <%= repliant %>!"

    if (action.defaultHeader)
        header = action.defaultHeader
    if (action.defaultTemplate)
        template = action.defaultTemplate

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

    if (msg.mentions) {
        msg.reply({ embeds: [simpleReactEmbed(defaultGifs, msg, action)] });
    }
    else {
        await msg.channel.send({ embeds: [simpleReactEmbed(defaultGifs, msg, action)] });
    }
    addActionToStatistic(action, msg);
}