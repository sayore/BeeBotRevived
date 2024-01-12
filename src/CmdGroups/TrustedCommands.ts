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
        messagecontent: "hi katze",
        async cmd(msg: Discord.Message) {
            switch (msg.member.id) {
                case "100656035718516736":
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
        triggerwords: ["ich mag", "katze"],
        async cmd(msg: Discord.Message) {
            msg.reply(getRandom(["	☜(⌒▽⌒)☞", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "(〃￣ω￣〃ゞ"]));
        }
    },
    {
        prefix: true,
        ownerlimited: true,
        typeofcmd: TypeOfCmd.Information,
        triggerwords: ["katze mention test"],
        async cmd(msg: Discord.Message) {
            msg.reply(JSON.stringify(getMentions(msg.content)));
        }
    },
    {
        prefix: true,
        typeofcmd: TypeOfCmd.Information,
        triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "katze profile"),
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
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "hug"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "hug", singular: "hug", plural: "hugs" }, [
                { link: "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif" },
                { link: 'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif' },
                { link: "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif" },
                { link: "https://c.tenor.com/0PIj7XctFr4AAAAC/a-whisker-away-hug.gif" },
                { link: "https://c.tenor.com/2lr9uM5JmPQAAAAC/hug-anime-hug.gif" },
                { link: "https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif" },
                { link: "https://c.tenor.com/IwRSZxi6vzkAAAAC/hug-hugs.gif" },
                { link: "https://c.tenor.com/fklZNDaU9NMAAAAC/hideri-hideri-kanzaki.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "attack"),
        async cmd(msg: Discord.Message, user) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            var target:Userdata|undefined = undefined;
            target ??= await Userdata.getUser(msg.mentions.repliedUser!=null?msg.mentions.repliedUser:undefined);
            target ??= await Userdata.getUser(mention);
            
            if (!!target) {                
                if(!target.rpg.damage) target.rpg.damage = 0;
                var dmg = RPG.attack(user.rpg, target.rpg);
                var reply = user.name + " attacks " + target.name + " for " + dmg + " damage! (" + (RPG.getMaxHealth(target.rpg) - dmg - target.rpg.damage)+" HP Left)";
                
                if (target.rpg.damage > RPG.getMaxHealth(target.rpg)) {
                    
                }
                if (target.rpg.damage > RPG.getMaxHealth(target.rpg)) {
                    reply += " " + target.name + " died! "+"\n ";
                    target.rpg.alive = false;
                    var targetUser = await msg.guild.members.fetch(target.id);
                    targetUser.timeout(1000 * 2, "You were attacked by " + user.name + " and are now in timeout for 2 minutes. /nYou can leave timeout by typing !leaveTimeout in the chat if you don't like rp or so idk man.");
                    target.extra.rpgDead = true;

                    setTimeout(async () => {
                        target.extra.rpgDead = false;
                        target.rpg.damage = 0;
                        target.rpg.alive = true;
                        msg.channel.send(target.name + " is back from timeout!");
                        target.save();
                    }, 1000 * 60 * 2);
                }

                target.rpg.damage += dmg;

                target.save();
                //user.save();
                
                //Fetch target user

                msg.reply(reply);
            } else {
                msg.reply("No target. You need to mention someone or reply to someone.");
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "boop"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "1234510sex"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "sex", singular: "sex", plural: "sexes" }, [
                { link: "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif" },
                { link: "https://picsegg.com/pics/3071/anime-hentai-rape-animated-gif-sex.gif" },
                { link: "https://cdn.discordapp.com/attachments/1018201604513607802/1128754719221874718/36705705fca471d1f972.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "kiss cheek"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "kisscheek", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif" },
                { link: "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "kiss"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "kiss", singular: "kiss", plural: "kisses" }, [
                { link: "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif" },
                { link: "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif" },
                { link: "https://c.tenor.com/F02Ep3b2jJgAAAAC/cute-kawai.gif" },
                { link: "https://c.tenor.com/woA_lrIFFAIAAAAC/girl-anime.gif" },
                { link: "https://c.tenor.com/fVMPQro2eZAAAAAC/anime-kiss.gif" },
                { link: "https://c.tenor.com/nRdyrvS3qa4AAAAC/anime-kiss.gif" },
                { link: "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif" },
                { link: "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif" },
            ])
        }
    },
    {
        userlimitedids:["465583365781717003"],
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "gib cuddle"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "cuddle", singular: "cuddle", plural: "cuddles", defaultTemplate: "<@!"+clientBee.user.id+"> <%= action.plural %> <%= sender %>!" }, [
                { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "cuddle"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "cuddle", singular: "cuddle", plural: "cuddles" }, [
                { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                { link: "https://c.tenor.com/H7i6GIP-YBwAAAAd/a-whisker-away-hug.gif" },
                { link: "https://c.tenor.com/MnFw3d0TjK4AAAAC/anime-hug.gif" },
                { link: "https://c.tenor.com/okeP090NK1cAAAAC/anime-couples.gif" },
                { link: "https://c.tenor.com/Dc5yd05wu_cAAAAC/couple-hug.gif" },
                { link: "https://c.tenor.com/GuHHnDT6quYAAAAd/anime-couples.gif" },
                { link: "https://c.tenor.com/0oha-un3OZIAAAAd/amor.gif" },
                { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "holdhands"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "handhold", singular: "Handholding", plural: "handholds" }, [
                { link: "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif" },
                { link: "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif" },
                { link: "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "pat"),
        async cmd(msg: Discord.Message) {
            //***happynoises are filling the room***
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, { target: mention, key: "pats", singular: "pats", plural: "pats" }, [
                { template: ["PATPATPATPATPATs <%= repliant %>!"], special: {}, link: "https://c.tenor.com/tYS5DBIos-UAAAAS/kyo-ani-musaigen.gif" },
                { template: ["PATPATPATPATPAT <%= repliant %>!"], special: {}, link: "https://c.tenor.com/EtvotzSToyMAAAAd/petra-rezero.gif" },
                { template: ["GET SHARK PATS <%= repliant %>!!"], special: {}, link: "https://c.tenor.com/JpairZOomiEAAAAd/bl%C3%A5haj-ikea-shark.gif" },
                { template: ["PATPATPATPATPAT! <%= repliant %> gets overly loved!"], special: {}, link: "https://c.tenor.com/rc8PwWHaV9gAAAAC/headpat-patpat.gif" },
                { template: ["PATPATPATPATPAT <%= repliant %>!"], special: {}, link: "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif" },
                { template: ["PATPATPATPATPAT <%= repliant %>!"], special: {}, link: "https://c.tenor.com/0XzZ4R16RaQAAAAC/anime-smile.gif" },
                { template: ["PATPATPATPATPAT *headrub* <%= repliant %>!"], special: {}, link: "https://c.tenor.com/QAIyvivjoB4AAAAC/anime-anime-head-rub.gif" },
                { template: ["PATPATPATPATPAT CUTIE <%= repliant %>!"], special: {}, link: "https://c.tenor.com/2oOTpioZ_j4AAAAC/pet-cute.gif" },
                { template: ["PATPATPATPATPAT <%= repliant %>!"], special: {}, link: "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif" },


                { template: ["<%= sender %> ist gestolpert beim versuch <%= repliant %> zu patten!"], special: {}, link: "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "hide"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "hide", singular: "hide", plural: "hides", 
                noTargetTemplate:"<%= sender %> <%= action.plural %>!",
                defaultTemplate: "<%= sender %> <%= action.plural %> from <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif" },
                { link: "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif" },
                { link: "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "blush"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "blush", singular: "blush", plural: "blushes",
                defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!",
                noTargetTemplate: "<%= sender %> <%= action.plural %>!"
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
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "love"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "love", singular: "love", plural: "loves",
                defaultTemplate: "<%= sender %> <%= action.plural %> <%= repliant %>!",
                noTargetTemplate: "<%= sender %> <%= action.plural %> themselves!"
            }, [
                { link: "https://cdn.discordapp.com/attachments/1056399315280597074/1084971616510943282/love-anime-gif-1.gif" },
                { link: "https://c.tenor.com/_2KihRhrHD8AAAAC/girls-heart.gif" },
                { link: "https://c.tenor.com/B-QkRiYZPZUAAAAC/cinderella-girls-anime.gif" },
                { link: "https://c.tenor.com/YYHukkdJkasAAAAC/anime-heart.gif" },
                { link: "https://c.tenor.com/hT2lCppV4tIAAAAC/anime-i-love-you.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "kill"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "kill", singular: "kill", plural: "kills",
                defaultTemplate: "<%= sender %> <%= action.plural %> <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif" },
                { link: "https://c.tenor.com/G4SGjQE8wCEAAAAC/mikey-tokyo.gif" },
                { link: "https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif" },
                { link: "https://c.tenor.com/Mn4W4D899WEAAAAC/ira-gamagoori-attack.gif" },
                { link: "https://c.tenor.com/36JvGViI95QAAAAC/tatsumi-akame-ga-kill.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "slay"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "slay", singular: "slay", plural: "slays",
                defaultTemplate: "<%= sender %> <%= action.plural %> <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif" },
                { link: "https://c.tenor.com/G4SGjQE8wCEAAAAC/mikey-tokyo.gif" },
                { link: "https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif" },
                { link: "https://c.tenor.com/Mn4W4D899WEAAAAC/ira-gamagoori-attack.gif" },
                { link: "https://c.tenor.com/36JvGViI95QAAAAC/tatsumi-akame-ga-kill.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "tickle"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "tickle", singular: "tickle", plural: "tickles",
                defaultTemplate: "<%= sender %> <%= action.plural %> <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/sa1QuA9GFaoAAAAC/anime-tickle.gif" },
                { link: "https://c.tenor.com/DHDRTfdbAbIAAAAd/tickle-yuya-sakaki.gif" },
                { link: "https://c.tenor.com/l3c7tV1zYD4AAAAC/date-a-live-date-a-live-iv.gif" },
                { link: "https://c.tenor.com/PXL1ONAO9CEAAAAC/tickle-laugh.gif" },
                { link: "https://c.tenor.com/L5-ABrIwrksAAAAC/tickle-anime.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "flex"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "flex", singular: "flex", plural: "flexes",
                defaultTemplate: "<%= sender %> <%= action.plural %> in front of <%= repliant %>!",
                noTargetTemplate: "<%= sender %> <%= action.plural %>!"
            }, [
                { link: "https://c.tenor.com/4PTfc3ym8m0AAAAC/anime-flex.gif" },
                { link: "https://c.tenor.com/IFZMiZKlWa0AAAAC/flexing-anime.gif" },
                { link: "https://c.tenor.com/v3KxhM48PpIAAAAC/anime-mha.gif" },
                { link: "https://c.tenor.com/nU3LQQY-1RYAAAAd/clothes-ripping-flexing.gif" },
                { link: "https://c.tenor.com/xH-VXjIUuXIAAAAC/djd4-anime.gif" },
                { link: "https://c.tenor.com/ymiqCoMt7mQAAAAd/strong-strong-man.gif" },
                { link: "https://c.tenor.com/avStzr1TzaIAAAAC/flex-dance.gif" },
                { link: "https://c.tenor.com/D1L843Lja3EAAAAi/anime-flex.gif" },
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "nom"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "nom", singular: "nom", plural: "noms",
                defaultTemplate: "<%= sender %> <%= action.plural %> noms <%= repliant %>!"
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
        prefix: true, typeofcmd: TypeOfCmd.Action, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "dance"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "dance", singular: "dance", plural: "dances",
                defaultTemplate: "<%= sender %> <%= action.plural %> with <%= repliant %>!",
                noTargetTemplate: "<%= sender %> <%= action.plural %>!"
            }, [
                { link: "https://c.tenor.com/GOYRQva4UeoAAAAd/anime-dance.gif" },
                { link: "https://c.tenor.com/LNVNahJyrI0AAAAC/aharen-dance.gif" },
                { link: "https://c.tenor.com/9eu9F42NQuYAAAAd/dance-anime-cool.gif" },
                { link: "https://c.tenor.com/5swdaNmQ8csAAAAd/anime-dance.gif" },
                { link: "https://c.tenor.com/13M7DM7nbGQAAAAd/anime-dance.gif" },
                { link: "https://c.tenor.com/NULSPE1mw2IAAAAd/dance-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "depressed"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "depressed", singular: "depressed", plural: "depressed",
                defaultTemplate: "<%= sender %> is <%= action.plural %> because of <%= repliant %>!",
                noTargetTemplate: "<%= sender %> is <%= action.plural %>.."
            }, [
                { link: "https://c.tenor.com/aF6zw9GgJlYAAAAd/waiting-cold.gif" },
                { link: "https://c.tenor.com/nwnRgU6R6OMAAAAd/anime-sword-art-online.gif" },
                { link: "https://c.tenor.com/17IgpB1KexsAAAAC/trash-disappointed.gif" },
                { link: "https://c.tenor.com/MP92ECwrHi8AAAAd/anime-down.gif" },
                { link: "https://c.tenor.com/pHusOu1IPqcAAAAC/depression-alone-sad-kiriyama-anime-windy.gif" },
                { link: "https://c.tenor.com/FUqg_JWXGCAAAAAC/sad-anime.gif" }
            ])
        }
    },
    {
        prefix: true, typeofcmd: TypeOfCmd.Action, triggerfunc: (msg) => _.startsWith(_.toLower(msg.content), "slap"),
        async cmd(msg: Discord.Message) {
            var mentions = getMentions(msg.content)[0];
            var mention = (mentions ? mentions : undefined)
            defaultReactionHandler(msg, {
                target: mention, key: "slap", singular: "slap", plural: "slaps",
                defaultTemplate: "<%= sender %> <%= action.plural %> <%= repliant %>!"
            }, [
                { link: "https://c.tenor.com/ra17G61QRQQAAAAC/tapa-slap.gif" },
                { link: "https://c.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif" },
                { link: "https://c.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif" },
                { link: "https://c.tenor.com/5jBuDXkDsjYAAAAC/slap.gif" },
                { link: "https://c.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif" },
                { link: "https://c.tenor.com/PeJyQRCSHHkAAAAC/saki-saki-mukai-naoya.gif" }
            ])
        }
    },
    {
        messagecontent: "good bee",
        async cmd(msg: Discord.Message) {
            msg.reply("yay \(◦'⌣'◦)/.");

            var user = await Userdata.getUser(msg.member.id);
            user.addSent("goodbee", 1);
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
        let senderVisName = msg.member?.user?.username ?? msg.member?.user?.tag ?? MessageHelper.getSendersVisibleName(msg);

        //console.log(msg.guild.name)
        //console.log(targetVisName)

        var fields = {
            sender: senderVisName,
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
            if(targetVisName=="noone?") 
                template = action.noTargetTemplate    


        var linkId = Math.floor(Math.random() * links.length);
        var link = links[linkId].link

        if (links[linkId].template) template = getRandom(links[linkId].template);
        if (links[linkId].header) header = getRandom(links[linkId].header);


        var reactionMsg = new Discord.MessageEmbed()
            .setColor('#FFD35D')
            .setTitle(_.template(header)(fields))
            .setDescription(_.template(template)(fields))
            .setImage(link);

        
        
        return reactionMsg;
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
    var createdEmbed=await simpleReactEmbed(defaultGifs, msg, action);
    var newmsg=msg.channel.send({ embeds: [createdEmbed] });


    setTimeout(async () => { 
        createdEmbed.setTitle("");
        createdEmbed.setDescription("("+action.singular+") "+createdEmbed.description);
        createdEmbed.setImage("");
        Logging.log("reactionMsg changed");
        (await newmsg).edit({ embeds: [createdEmbed] });
     }, 30000);

    addActionToStatistic(action, msg);
    }