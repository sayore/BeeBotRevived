import { ICommand, TypeOfCmd } from "./icommands";
import * as Discord from 'discord.js';
import { clientBee } from "../app";
import { MessageHelper } from "../supernode/Discord/MessageHelper";


export let TrustedCommands : ICommand[] = [
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Information,
        triggerwords:["bee","how","many","actions"],
        async cmd(msg:Discord.Message) {
            msg.reply("There are "+
                TrustedCommands.filter(v=>{return v.typeofcmd==TypeOfCmd.Action}).length+" commands.");
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Information,
        triggerwords:["bee","what","are","actions","there"],
        async cmd(msg:Discord.Message) {
            msg.reply("There are '"+
                TrustedCommands.filter(v=>{return v.typeofcmd==TypeOfCmd.Action}).map(v=>{return v.messagecontent}).join("','")+"'.");
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"hug",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"boop",
        async cmd(msg:Discord.Message) {
            let links = [
                "https://c.tenor.com/l5XjHcppGN0AAAAd/boop.gif",
                "https://c.tenor.com/YYoFAH8B7GAAAAAd/anime-your-face-is-cute.gif",
                "https://c.tenor.com/YowICbg6ApcAAAAC/aww-hugging.gif"
            ]
            // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif

            // Send "pong" to the same channel
			const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#FFD35D')
				.setTitle('Boop!')
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} boops ${MessageHelper.getRepliantsVisibleName(msg)}`)
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"kiss",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"kiss cheek",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"cuddle",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"holdhands",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"hide",
        async cmd(msg:Discord.Message) {
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
                .setDescription(`${MessageHelper.getSendersVisibleName(msg)} hides ${(MessageHelper.hasRepliant(msg)?"from "+MessageHelper.getRepliantsVisibleName(msg)+"!!!":"!!!")}`)
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"blush",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        prefix:true,
        typeofcmd:TypeOfCmd.Action,
        messagecontent:"love",
        async cmd(msg:Discord.Message) {
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
				.setImage(links[Math.floor(Math.random()*links.length)])
			let m = await msg.reply({embeds:[exampleEmbed]});
            
        }
    },
    {
        messagecontent:"good bee",
        async cmd(msg:Discord.Message){
            msg.reply("yay \(◦'⌣'◦)/.");
        }
    },
]