"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustedCommands = void 0;
const icommands_1 = require("./icommands");
const Discord = __importStar(require("discord.js"));
const app_1 = require("../app");
const mod_1 = require("supernode/Discord/mod");
const command_helper_1 = require("./command.helper");
const db_helper_1 = require("../db.helper");
const discord_js_1 = require("discord.js");
const master_1 = require("./master");
exports.TrustedCommands = [
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Information,
        triggerwords: ["bee", "how", "many", "actions"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("There are " +
                    exports.TrustedCommands.filter(v => { return v.typeofcmd == icommands_1.TypeOfCmd.Action; }).length + " commands.");
            });
        }
    },
    {
        messagecontent: "hello bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (msg.member.id) {
                    case "562640877705756690":
                        msg.reply("Hi master uwu");
                        break;
                    case "465583365781717003":
                        msg.reply((0, command_helper_1.getRandom)(["hello cutie kaly <3", "hey :3", "top1 best cutie", "hey kaly <3", "cutie ❤️", "how you doin kaly <:lunalove:915990988177162280>"]));
                        break;
                    case "902232441748615201":
                        msg.reply((0, command_helper_1.getRandom)(["Hi master uwu"]));
                        break;
                    case "387372763171520513":
                        msg.reply((0, command_helper_1.getRandom)(["Hey pan *blushes*", "Good to see you pan <:yay:855047723118886912>"]));
                        break;
                    default:
                        msg.reply((0, command_helper_1.getRandom)(["Hi!", "Heya! <:yay:855047723118886912>"]));
                }
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Information,
        triggerwords: ["bee", "what", "are", "actions", "there"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("There are '" +
                    exports.TrustedCommands.filter(v => { return v.typeofcmd == icommands_1.TypeOfCmd.Action; }).map(v => { return v.messagecontent; }).join("','") + "'.");
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Information,
        triggerwords: ["bee", "help"],
        cmd(msg) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("MasterCmds: '" +
                    ((_a = master_1.MasterCommands.filter(v => { return v.messagecontent != undefined; })) === null || _a === void 0 ? void 0 : _a.map(v => { return "**" + v.messagecontent + "**"; }).join("','")) + "'.\n" +
                    ((_b = master_1.MasterCommands.filter(v => { return v.triggerwords != undefined; })) === null || _b === void 0 ? void 0 : _b.map(v => { return "**" + v.triggerwords + "**"; }).join("','")) + "'.\n" +
                    "TrustedCmds: '" +
                    ((_c = exports.TrustedCommands.filter(v => { return v.messagecontent != undefined; })) === null || _c === void 0 ? void 0 : _c.map(v => { return "**" + v.messagecontent + "**"; }).join("','")) + "'.\n" +
                    ((_d = exports.TrustedCommands.filter(v => { return v.triggerwords != undefined; })) === null || _d === void 0 ? void 0 : _d.map(v => { return "**" + v.triggerwords + "**"; }).join("','")) + "'.\n");
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Information,
        triggerwords: ["i love", "bee"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply((0, command_helper_1.getRandom)(["	☜(⌒▽⌒)☞", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", "(〃￣ω￣〃ゞ"]));
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "hug",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif",
                    'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
                    "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif",
                    "https://c.tenor.com/0PIj7XctFr4AAAAC/a-whisker-away-hug.gif",
                    "https://c.tenor.com/2lr9uM5JmPQAAAAC/hug-anime-hug.gif",
                    "https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif",
                    "https://c.tenor.com/IwRSZxi6vzkAAAAC/hug-hugs.gif"
                ];
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Hugs!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} hugs ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "hug";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "boop",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/l5XjHcppGN0AAAAd/boop.gif",
                    "https://c.tenor.com/B1ohHuPJIpgAAAAS/anime-cuteness.gif",
                    "https://c.tenor.com/YYoFAH8B7GAAAAAd/anime-your-face-is-cute.gif",
                    "https://c.tenor.com/YowICbg6ApcAAAAC/aww-hugging.gif",
                    "https://c.tenor.com/HZWeNnmcbBYAAAAS/cat-boop.gif",
                    "https://c.tenor.com/RmQElPHERIoAAAAC/boop-anime.gif"
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Boop!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} boops ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "boop";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "sex",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif",
                    "https://c.tenor.com/XCLEsDZBeBQAAAAC/kissxsis-anime.gif", //clothed, touching wiender kiss xsis
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Sex!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} fucks ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}. **moans***`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "sex";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "kiss",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif",
                    "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif",
                    "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif",
                    "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif"
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Kiss!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} kisses ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "kiss";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "kiss cheek",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif",
                    "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Kiss!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} kisses ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "kiss cheeck";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "cuddle",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif",
                    "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif",
                    "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif",
                    "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif"
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Cuddle!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} cuddles ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "cuddle";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "holdhands",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif",
                    "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif",
                    "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Handholding!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} handholds ${mod_1.MessageHelper.getRepliantsVisibleName(msg)} ***blushes***`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "holdhand";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "pat",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/tYS5DBIos-UAAAAS/kyo-ani-musaigen.gif",
                    "https://c.tenor.com/EtvotzSToyMAAAAd/petra-rezero.gif",
                    "https://c.tenor.com/rc8PwWHaV9gAAAAC/headpat-patpat.gif",
                    "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif",
                    "https://c.tenor.com/0XzZ4R16RaQAAAAC/anime-smile.gif",
                    "https://c.tenor.com/QAIyvivjoB4AAAAC/anime-anime-head-rub.gif",
                    "https://c.tenor.com/2oOTpioZ_j4AAAAC/pet-cute.gif",
                    "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Pats!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} pats ${mod_1.MessageHelper.getRepliantsVisibleName(msg)} ***happynoises are filling the room***`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "pat";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "hide",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif",
                    "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif",
                    "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Hides!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} hides ${(mod_1.MessageHelper.hasRepliant(msg) ? "from " + mod_1.MessageHelper.getRepliantsVisibleName(msg) + "!!!" : "!!!")}`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "hide";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "blush",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/wwxHnJqUNEMAAAAC/anime-blush.gif",
                    "https://c.tenor.com/M7wcdD0eujYAAAAd/anime-looking.gif",
                    "https://c.tenor.com/2cWyWrf4ucAAAAAS/cyan-hijirikawa-show-by-rock.gif",
                    "https://c.tenor.com/Z4l7tKpmHXsAAAAC/anime-blush-cute.gif",
                    "https://c.tenor.com/OWVyLN0FS_MAAAAC/morgiana-anime.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Blush!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} blushes.`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "blush";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "love",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/_2KihRhrHD8AAAAC/girls-heart.gif",
                    "https://c.tenor.com/1rEO6m7rWWQAAAAC/i-love-you-love.gif",
                    "https://c.tenor.com/B-QkRiYZPZUAAAAC/cinderella-girls-anime.gif",
                    "https://c.tenor.com/YYHukkdJkasAAAAC/anime-heart.gif",
                    "https://c.tenor.com/hT2lCppV4tIAAAAC/anime-i-love-you.gif",
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Love!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} loves ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                let m = yield msg.reply({ embeds: [exampleEmbed] });
                var action = "love";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "nom",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/9dOzFGFZxnoAAAAM/bite-anime.gif",
                    "https://c.tenor.com/djDaxKCZXpwAAAAM/chomp-cute.gif",
                    "https://c.tenor.com/SXuvQ7XzeD0AAAAM/cake-birthday.gif",
                    "https://c.tenor.com/NUvfL_4DmHoAAAAM/yum-cute.gif",
                    "https://c.tenor.com/i9UwyNJiHCQAAAAM/nom-anime.gif"
                ];
                // https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif
                // Send "pong" to the same channel
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Nom\'d!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} noms ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}. RIP`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                //@ts-ignore
                let m = yield msg.channel.send({ embeds: [exampleEmbed] });
                var action = "nom";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        messagecontent: "good bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("yay \(◦'⌣'◦)/.");
                var action = "goodbee";
                db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sSent::" + msg.member.id + "", 1);
                if (msg.mentions)
                    db_helper_1.DBHelper.increase(app_1.db, "action::" + action + "sReceived::" + msg.mentions.repliedUser.id, 1);
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "marry",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/aJjnVhJ1k_0AAAAd/melamar-geisha.gif",
                    "https://c.tenor.com/NK-CNqOr5TwAAAAC/hu-tao-marry.gif",
                    "https://c.tenor.com/IcwN28AtBVgAAAAC/marry-me-anime.gif"
                ];
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('Love is in the air!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} proposes to ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                const row = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('accept-marriage')
                    .setLabel('I DO!')
                    .setStyle('SUCCESS')).addComponents(new discord_js_1.MessageButton()
                    .setCustomId('reject-marriage')
                    .setLabel('Reject')
                    .setStyle('DANGER'));
                msg.reply({ embeds: [exampleEmbed], components: [row] });
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "divorce",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/zr2rab_BRioAAAAC/schtroumpf-peyo.gif"
                ];
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('OH NO!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} wants to divorce ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                const row = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('accept-divorce')
                    .setLabel('Yes')
                    .setStyle('SUCCESS')).addComponents(new discord_js_1.MessageButton()
                    .setCustomId('reject-divorce')
                    .setLabel('NOOO')
                    .setStyle('DANGER'));
                msg.reply({ embeds: [exampleEmbed], components: [row] });
            });
        }
    },
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Action,
        messagecontent: "bbtext",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                let links = [
                    "https://c.tenor.com/zr2rab_BRioAAAAC/schtroumpf-peyo.gif"
                ];
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFD35D')
                    .setTitle('OH NO!')
                    .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(msg)} wants to divorce ${mod_1.MessageHelper.getRepliantsVisibleName(msg)}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                const row = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('bbtext')
                    .setLabel('BBText')
                    .setStyle('SUCCESS'));
                msg.reply({ embeds: [exampleEmbed], components: [row] });
            });
        }
    },
];
//# sourceMappingURL=trusted.js.map