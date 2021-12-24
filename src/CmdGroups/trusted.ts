import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee, db } from "../app";
import { MessageHelper } from "supernode/Discord/mod";
import { getRandom } from "./command.helper";
import { DBHelper } from "../db.helper";
import { MessageActionRow, MessageButton } from "discord.js";
import { EveryoneCommands } from "./everyone";
import { MasterCommands } from "./master";


export let TrustedCommands: ICommand[] = [
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerwords: ["bee", "how", "many", "actions"],
        
        async cmd(msg: Discord.Message) {
            msg.reply("There are " +
                TrustedCommands.filter(v => { return v.typeofcmd == TypeOfCmd.Action }).length + " commands.");
        }
    },
    {
        messagecontent:"hello bee",
        async cmd(msg:Discord.Message){
            switch(msg.member.id) {
                case "562640877705756690":
                    msg.reply("Hi master uwu");
                    break;
                case "465583365781717003":
                    msg.reply(getRandom(["hello cutie kaly <3","hey :3","top1 best cutie","hey kaly <3","cutie ❤️","how you doin kaly <:lunalove:915990988177162280>"]));
                    break;
                case "902232441748615201":
                    msg.reply(getRandom(["Hi master uwu"]));
                    break;
                case "387372763171520513":
                    msg.reply(getRandom(["Hey pan *blushes*","Good to see you pan <:yay:855047723118886912>"]));
                    break;
                default:
                    msg.reply(getRandom(["Hi!","Heya! <:yay:855047723118886912>"]));
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
        triggerwords: ["bee","help"],
        async cmd(msg: Discord.Message) {
            msg.reply("MasterCmds: '" +
                MasterCommands.filter(v => { return v.messagecontent != undefined })?.map(v => { return   "**"+v.messagecontent+"**" }).join("','") + "'.\n" +
                MasterCommands.filter(v => { return v.triggerwords != undefined })?.map(v => { return     "**"+v.triggerwords  +"**" }).join("','") + "'.\n"+
            "TrustedCmds: '"+
                TrustedCommands.filter(v => { return v.messagecontent != undefined })?.map(v => { return  "**"+v.messagecontent+"**" }).join("','") + "'.\n" +
                TrustedCommands.filter(v => { return v.triggerwords != undefined })?.map(v => { return    "**"+v.triggerwords  +"**" }).join("','") + "'.\n");
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
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "hug",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif",
                'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
                "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif",
                "https://c.tenor.com/0PIj7XctFr4AAAAC/a-whisker-away-hug.gif",
                "https://c.tenor.com/2lr9uM5JmPQAAAAC/hug-anime-hug.gif",
                "https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif",
                "https://c.tenor.com/IwRSZxi6vzkAAAAC/hug-hugs.gif"
            ]

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Hugs!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} hugs ${MessageHelper.getRepliantsVisibleName(msg)}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "hug";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "boop",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/l5XjHcppGN0AAAAd/boop.gif",
                "https://c.tenor.com/B1ohHuPJIpgAAAAS/anime-cuteness.gif",
                "https://c.tenor.com/YYoFAH8B7GAAAAAd/anime-your-face-is-cute.gif",
                "https://c.tenor.com/YowICbg6ApcAAAAC/aww-hugging.gif",
                "https://c.tenor.com/HZWeNnmcbBYAAAAS/cat-boop.gif",
                "https://c.tenor.com/RmQElPHERIoAAAAC/boop-anime.gif"
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Boop!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} boops ${MessageHelper.getRepliantsVisibleName(msg)}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "boop";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "sex",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif", // From behind
                "https://c.tenor.com/XCLEsDZBeBQAAAAC/kissxsis-anime.gif", //clothed, touching wiender kiss xsis
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Sex!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} fucks ${MessageHelper.getRepliantsVisibleName(msg)}. **moans***`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "sex";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "kiss",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif",
                "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif",
                "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif",
                "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif"
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Kiss!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} kisses ${MessageHelper.getRepliantsVisibleName(msg)}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "kiss";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "kiss cheek",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif",
                "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Kiss!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} kisses ${MessageHelper.getRepliantsVisibleName(msg)}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "kiss cheeck";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "cuddle",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif",
                "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif",
                "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif",
                "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif"
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Cuddle!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} cuddles ${MessageHelper.getRepliantsVisibleName(msg)}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "cuddle";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "holdhands",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif",
                "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif",
                "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Handholding!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} handholds ${MessageHelper.getRepliantsVisibleName(msg)} ***blushes***`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "holdhand";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "pat",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/tYS5DBIos-UAAAAS/kyo-ani-musaigen.gif",
                "https://c.tenor.com/EtvotzSToyMAAAAd/petra-rezero.gif",
                "https://c.tenor.com/rc8PwWHaV9gAAAAC/headpat-patpat.gif",
                "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif",
                "https://c.tenor.com/0XzZ4R16RaQAAAAC/anime-smile.gif",
                "https://c.tenor.com/QAIyvivjoB4AAAAC/anime-anime-head-rub.gif",
                "https://c.tenor.com/2oOTpioZ_j4AAAAC/pet-cute.gif",
                "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Pats!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} pats ${MessageHelper.getRepliantsVisibleName(msg)} ***happynoises are filling the room***`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "pat";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "hide",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif",
                "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif",
                "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Hides!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} hides ${(MessageHelper.hasRepliant(msg) ? "from " + MessageHelper.getRepliantsVisibleName(msg) + "!!!" : "!!!")}`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "hide";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "blush",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/wwxHnJqUNEMAAAAC/anime-blush.gif",
                "https://c.tenor.com/M7wcdD0eujYAAAAd/anime-looking.gif",
                "https://c.tenor.com/2cWyWrf4ucAAAAAS/cyan-hijirikawa-show-by-rock.gif",
                "https://c.tenor.com/Z4l7tKpmHXsAAAAC/anime-blush-cute.gif",
                "https://c.tenor.com/OWVyLN0FS_MAAAAC/morgiana-anime.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Blush!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} blushes.`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "blush";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "love",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/_2KihRhrHD8AAAAC/girls-heart.gif",
                "https://c.tenor.com/1rEO6m7rWWQAAAAC/i-love-you-love.gif",
                "https://c.tenor.com/B-QkRiYZPZUAAAAC/cinderella-girls-anime.gif",
                "https://c.tenor.com/YYHukkdJkasAAAAC/anime-heart.gif",
                "https://c.tenor.com/hT2lCppV4tIAAAAC/anime-i-love-you.gif",
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Love!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} loves ${MessageHelper.getRepliantsVisibleName(msg)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            let m = await msg.reply({ embeds: [exampleEmbed] });

            var action = "love";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "nom",
        async cmd(msg: Discord.Message) {
            let links = [
                "https://c.tenor.com/9dOzFGFZxnoAAAAM/bite-anime.gif",
                "https://c.tenor.com/djDaxKCZXpwAAAAM/chomp-cute.gif",
                "https://c.tenor.com/SXuvQ7XzeD0AAAAM/cake-birthday.gif",
                "https://c.tenor.com/NUvfL_4DmHoAAAAM/yum-cute.gif",
                "https://c.tenor.com/i9UwyNJiHCQAAAAM/nom-anime.gif"
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FFD35D')
                .setTitle('Nom\'d!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} noms ${MessageHelper.getRepliantsVisibleName(msg)}. RIP`)
                .setImage(links[Math.floor(Math.random() * links.length)])
            //@ts-ignore
            let m = await msg.channel.send({ embeds: [exampleEmbed] });

            var action = "nom";
            DBHelper.increase(db, "action::" + action + "sSent::" + msg.member.id + "", 1);
            if (msg.mentions)
                DBHelper.increase(db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
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
        prefix: true,
        typeofcmd: TypeOfCmd.Action,
        messagecontent: "marry",
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