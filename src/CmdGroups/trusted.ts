import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { getRandom } from "./command.helper";
import { DBHelper } from "../db.helper";
import { MessageActionRow, MessageButton } from "discord.js";
import { EveryoneCommands } from "./everyone";
import { MasterCommands } from "./master";
import _ from "lodash";


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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "hug",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "hug", singular: "hug", plural: "hugs" }, [
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "boop",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "boop", singular: "boop", plural: "boops" }, [
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "sex",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "sex", singular: "sex", plural: "sexes" }, [
                { link: "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif" },
                { link: "https://c.tenor.com/XCLEsDZBeBQAAAAC/kissxsis-anime.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "kiss",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "kiss", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif" },
                { link: "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif" },
                { link: "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif" },
                { link: "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "kiss cheek",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "kisscheek", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif" },
                { link: "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "cuddle",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "cuddle", singular: "cuddle", plural: "cuddles" }, [
                { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "holdhands",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, { key: "handhold", singular: "Handholding", plural: "handholds" }, [
                { link: "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif" },
                { link: "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif" },
                { link: "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "pat",
        async cmd(msg: Discord.Message) {
            //***happynoises are filling the room***
            defaultReactionHandler(msg, { key: "pats", singular: "Pats", plural: "pats" }, [
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "hide",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, {
                key: "hide", singular: "hide", plural: "hides",
                defaultTemplate: "<%= sender %> <%= action.plural %> from <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif" },
                { link: "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif" },
                { link: "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "blush",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, {
                key: "blush", singular: "blush", plural: "blushes",
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, messagecontent: "love",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, {
                key: "love", singular: "love", plural: "loves",
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
        prefix: true, typeofcmd: TypeOfCmd.Action, messagecontent: "nom",
        async cmd(msg: Discord.Message) {
            defaultReactionHandler(msg, {
                key: "nom", singular: "nom", plural: "noms",
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

function addActionToStatistic(action: string, msg: Discord.Message) {
    DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
    if (msg.mentions)
        DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
}

function simpleReactEmbed(
    links: { link: string, template?: string[], header?: string[], special?: any }[],
    msg: Discord.Message,
    action: { key: string, singular: string, plural: string, defaultTemplate?: string, defaultHeader?: string }) {
    var fields = {
        sender: MessageHelper.getSendersVisibleName(msg),
        repliant: MessageHelper.getRepliantsVisibleName(msg),
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

async function defaultReactionHandler(msg: Discord.Message, action: { key: string, singular: string, plural: string, defaultTemplate?: string, defaultHeader?: string }, defaultGifs: { link: string, template?: string[], header?: string[], special?: any }[]) {
    //var gifkey="actionGIFs::"+action.key;
    //var links:{link:string,template:string,special:any}[]=[];
    /**if(db.exists(gifkey)){
        var gifs = db.get(gifkey)
    } else {
        db.put(gifkey,defaultGifs)
    }*/

    let m = await msg.reply({ embeds: [simpleReactEmbed(defaultGifs, msg, action)] });
    addActionToStatistic("cuddle", msg);
}