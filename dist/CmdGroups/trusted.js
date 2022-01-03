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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
const lodash_1 = __importDefault(require("lodash"));
const user_1 = require("../Helper/user");
const Logging_1 = require("supernode/Base/Logging");
const canvas_1 = require("canvas");
const color_1 = __importDefault(require("color"));
exports.TrustedCommands = [
    {
        prefix: true,
        typeofcmd: icommands_1.TypeOfCmd.Information,
        isHalting: true,
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
                        msg.reply((0, command_helper_1.getRandom)(["Hi master uwu", "Luna uwu"]));
                        break;
                    case "387372763171520513": //Pan
                        msg.reply((0, command_helper_1.getRandom)(["Hey pan *blushes*", "Good to see you pan <:yay:855047723118886912>"]));
                        break;
                    case "662209384482603019": //Tato
                        msg.reply((0, command_helper_1.getRandom)([
                            "Hey potato *blushes*",
                            "Hi potato <:yay:855047723118886912>",
                            "Glad you are around ryu!",
                            "*hugs rin* heya! :3"
                        ]));
                        break;
                    default:
                        msg.reply((0, command_helper_1.getRandom)(["Hi!", "Heya! <:yay:855047723118886912>", "Hey " + msg.member.displayName + "!", , "Heya " + msg.member.displayName + "! <:yay:855047723118886912>"]));
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
        isHalting: true,
        triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "bee help"),
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
        typeofcmd: icommands_1.TypeOfCmd.Information,
        triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "bee profile"),
        cmd(msg, user) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var mentions = (0, command_helper_1.getMentions)(msg.content);
                    if (mentions.length == 1)
                        user = yield (0, user_1.getUser)(mentions[0]);
                    /**msg.reply("\`" + user.tag + " -> Lvl " + user.rpg.level + "(" + Math.floor(RPG.expToNextLevel(user.rpg)) + "/" + RPG.getExpNeeded(user.rpg) + " EXP)" + "\`\n" +
                        "\`" + "       STR AGI VIT INT DEX LUK      " + "\`\n" +
                        "\`" + "       " + user.rpg.str.toString().padEnd(3, " ") + " " + user.rpg.agi.toString().padEnd(3, " ") + " " + user.rpg.vit.toString().padEnd(3, " ") + " " + user.rpg.int.toString().padEnd(3, " ") + " " + user.rpg.dex.toString().padEnd(3, " ") + " " + user.rpg.luk.toString().padEnd(3, " ") + "      " + "\`\n" +
                        "\`" + "            Sent        Received    " + "\`\n" +
                        "\`------------------------------------\`\n" +
                        "\`" + "Hugs        " + (await user.getSent("hugs")).toString().padEnd(12, " ") + (await user.getReceived("hugs")).toString().padEnd(12, " ") + "\`\n" +
                        "\`" + "Cuddles     " + (await user.getSent("cuddles")).toString().padEnd(12, " ") + (await user.getReceived("cuddles")).toString().padEnd(12, " ") + "\`\n" +
                        "\`" + "Pats        " + (await user.getSent("pats")).toString().padEnd(12, " ") + (await user.getReceived("pats")).toString().padEnd(12, " ") + "\`\n" +
                        "\`" + "Noms        " + (await user.getSent("noms")).toString().padEnd(12, " ") + (await user.getReceived("noms")).toString().padEnd(12, " ") + "\`\n" +
                        "\`" + "?           " + (await user.getSent("goodbees")).toString().padEnd(12, " ") + (await user.getReceived("goodbees")).toString().padEnd(12, " ") + "\`");**/
                    var canvas = (0, canvas_1.createCanvas)(720, 460);
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = ctx.createLinearGradient(0, 0, 720, 460);
                    //ctx.fillStyle.addColorStop(0,"#2fb16c")
                    ctx.fillStyle.addColorStop(0, (0, color_1.default)(user.hexcolor).lighten(0.1).saturate(1.1).hex());
                    //ctx.fillStyle.addColorStop(1,"#68df71")
                    ctx.fillStyle.addColorStop(1, (0, color_1.default)(user.hexcolor).darken(0.2).hex());
                    ctx.fillRect(0, 0, 720, 460);
                    ctx.font = '80px Impact';
                    ctx.fillStyle = "black";
                    ctx.fillText(user.tag, 10, 85);
                    ctx.font = '34px Mono';
                    ctx.fillStyle = "black";
                    function writeStat(pos, text, val) {
                        ctx.fillText(text + " " + val.toString(), 20, 150 + pos * 40);
                    }
                    writeStat(0, "STR", user.rpg.str);
                    writeStat(1, "AGI", user.rpg.agi);
                    writeStat(2, "VIT", user.rpg.vit);
                    writeStat(3, "INT", user.rpg.int);
                    writeStat(4, "DEX", user.rpg.dex);
                    writeStat(5, "LUK", user.rpg.luk);
                    ctx.font = '34px Mono';
                    ctx.fillStyle = "black";
                    ctx.fillText("Actions".padEnd(10, " ") + " " + ("Sent").toString().padEnd(6, " ") + ("Got").toString().padEnd(6, " "), 280, 150);
                    function writeAction(pos, action, text) {
                        return __awaiter(this, void 0, void 0, function* () {
                            ctx.fillText(text.padEnd(10, " ") + " " + (yield user.getSent(action)).toString().padEnd(6, " ") + (yield user.getReceived(action)).toString().padEnd(6, " "), 280, 150 + (pos + 1) * 36);
                        });
                    }
                    yield writeAction(0, "hugs", "Hugs");
                    yield writeAction(1, "pats", "Pats");
                    yield writeAction(2, "cuddles", "Cuddles");
                    yield writeAction(3, "noms", "Noms");
                    yield writeAction(4, "goodbees", "Goodbees");
                    ctx.resetTransform();
                    ctx.font = '30px Impact';
                    ctx.rotate(0.1);
                    ctx.fillStyle = "yellow";
                    ctx.fillText('Awesome!', 50, 100);
                    ctx.fillStyle = "black";
                    ctx.strokeText('Awesome!', 50, 100);
                    msg.reply({ files: [new Discord.MessageAttachment(canvas.createPNGStream(), 'temp.png')] });
                }
                catch (e) {
                    Logging_1.Logging.log("Could not create User Profile", Logging_1.LogLevel.Verbose);
                    console.log(e);
                }
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "hug"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "hug", singular: "hug", plural: "hugs" }, [
                    { link: "https://c.tenor.com/OXCV_qL-V60AAAAC/mochi-peachcat-mochi.gif" },
                    { link: 'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif' },
                    { link: "https://c.tenor.com/X5nBTYuoKpoAAAAC/anime-cheeks.gif" },
                    { link: "https://c.tenor.com/0PIj7XctFr4AAAAC/a-whisker-away-hug.gif" },
                    { link: "https://c.tenor.com/2lr9uM5JmPQAAAAC/hug-anime-hug.gif" },
                    { link: "https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif" },
                    { link: "https://c.tenor.com/IwRSZxi6vzkAAAAC/hug-hugs.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "boop"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "boop", singular: "boop", plural: "boops" }, [
                    { link: "https://c.tenor.com/l5XjHcppGN0AAAAd/boop.gif" },
                    { link: "https://c.tenor.com/B1ohHuPJIpgAAAAS/anime-cuteness.gif" },
                    { link: "https://c.tenor.com/YYoFAH8B7GAAAAAd/anime-your-face-is-cute.gif" },
                    { link: "https://c.tenor.com/YowICbg6ApcAAAAC/aww-hugging.gif" },
                    { link: "https://c.tenor.com/HZWeNnmcbBYAAAAS/cat-boop.gif" },
                    { link: "https://c.tenor.com/RmQElPHERIoAAAAC/boop-anime.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "sex"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "sex", singular: "sex", plural: "sexes" }, [
                    { link: "https://c.tenor.com/-XrLQFqn8N0AAAAC/yuri-lewd.gif" },
                    { link: "https://c.tenor.com/XCLEsDZBeBQAAAAC/kissxsis-anime.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "kiss"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "kiss", singular: "kiss", plural: "kisses" }, [
                    { link: "https://c.tenor.com/_ttVgUDKJL0AAAAC/anime-couple.gif" },
                    { link: "https://c.tenor.com/v4Ur0OCvaXcAAAAd/koi-to-uso-kiss.gif" },
                    { link: "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif" },
                    { link: "https://c.tenor.com/sihR3Fv5t8AAAAAd/bloom-into-you-yagate-kimi-ni-naru.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "kiss cheek"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "kisscheek", singular: "kiss", plural: "kisses" }, [
                    { link: "https://c.tenor.com/OC54_DJOXRAAAAAC/love-anime.gif" },
                    { link: "https://c.tenor.com/etSTc3aWspcAAAAC/yuri-kiss.gif" }
                ]);
            });
        }
    },
    {
        userlimitedids: ["465583365781717003"],
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "gib cuddle"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "cuddle", singular: "cuddle", plural: "cuddles", defaultTemplate: "<@!" + app_1.clientBee.user.id + "> <%= action.plural %> <%= sender %>!" }, [
                    { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                    { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                    { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                    { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "cuddle"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "cuddle", singular: "cuddle", plural: "cuddles" }, [
                    { link: "https://c.tenor.com/Cy8RWMcVDj0AAAAd/anime-hug.gif" },
                    { link: "https://c.tenor.com/DlW1R4d1NQAAAAAC/anime-cuddle.gif" },
                    { link: "https://c.tenor.com/ch1kq7TOxlkAAAAC/anime-cuddle.gif" },
                    { link: "https://c.tenor.com/GJ6oX6r0mZsAAAAC/chuunibyou-anime.gif" }
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "holdhands"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "handhold", singular: "Handholding", plural: "handholds" }, [
                    { link: "https://c.tenor.com/WUZAwo5KFdMAAAAd/love-holding-hands.gif" },
                    { link: "https://c.tenor.com/rU3xZo2_jaIAAAAC/anime-hold.gif" },
                    { link: "https://c.tenor.com/wC3hJXbQtYMAAAAd/touch-hands.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "pat"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                //***happynoises are filling the room***
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, { target: mention, key: "pats", singular: "Pats", plural: "pats" }, [
                    { template: ["PATPATPATPATPAT"], special: {}, link: "https://c.tenor.com/tYS5DBIos-UAAAAS/kyo-ani-musaigen.gif" },
                    { template: ["PATPATPATPATPAT?"], special: {}, link: "https://c.tenor.com/EtvotzSToyMAAAAd/petra-rezero.gif" },
                    { template: ["PATPATPATPATPAT!"], special: {}, link: "https://c.tenor.com/rc8PwWHaV9gAAAAC/headpat-patpat.gif" },
                    { template: ["PATPATPATPATPAT MAAAI"], special: {}, link: "https://c.tenor.com/wLqFGYigJuIAAAAC/mai-sakurajima.gif" },
                    { template: ["PATPATPATPATPAT"], special: {}, link: "https://c.tenor.com/0XzZ4R16RaQAAAAC/anime-smile.gif" },
                    { template: ["PATPATPATPATPAT *headrub*"], special: {}, link: "https://c.tenor.com/QAIyvivjoB4AAAAC/anime-anime-head-rub.gif" },
                    { template: ["PATPATPATPATPAT CUTE"], special: {}, link: "https://c.tenor.com/2oOTpioZ_j4AAAAC/pet-cute.gif" },
                    { template: ["PATPATPATPATPAT ANIME"], special: {}, link: "https://c.tenor.com/Vz5yn1fwv-gAAAAd/pat-anime.gif" }
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "hide"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, {
                    target: mention, key: "hide", singular: "hide", plural: "hides",
                    noTargetTemplate: "<%= sender %> <%= action.plural %>!",
                    defaultTemplate: "<%= sender %> <%= action.plural %> from <%= repliant %>!"
                }, [
                    { link: "https://c.tenor.com/T6X8wbaOGhIAAAAC/sagiri-bed.gif" },
                    { link: "https://c.tenor.com/AmYTuh5XM7sAAAAC/shy-rikka.gif" },
                    { link: "https://c.tenor.com/M1oWwoks4DUAAAAS/croqueta.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "blush"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, {
                    target: mention, key: "blush", singular: "blush", plural: "blushes",
                    defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!"
                }, [
                    { link: "https://c.tenor.com/wwxHnJqUNEMAAAAC/anime-blush.gif" },
                    { link: "https://c.tenor.com/M7wcdD0eujYAAAAd/anime-looking.gif" },
                    { link: "https://c.tenor.com/2cWyWrf4ucAAAAAS/cyan-hijirikawa-show-by-rock.gif" },
                    { link: "https://c.tenor.com/Z4l7tKpmHXsAAAAC/anime-blush-cute.gif" },
                    { link: "https://c.tenor.com/OWVyLN0FS_MAAAAC/morgiana-anime.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, isHalting: true, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "love"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
                defaultReactionHandler(msg, {
                    target: mention, key: "love", singular: "love", plural: "loves",
                    defaultTemplate: "<%= sender %> <%= action.plural %> because of <%= repliant %>!"
                }, [
                    { link: "https://c.tenor.com/1rEO6m7rWWQAAAAC/i-love-you-love.gif" },
                    { link: "https://c.tenor.com/_2KihRhrHD8AAAAC/girls-heart.gif" },
                    { link: "https://c.tenor.com/B-QkRiYZPZUAAAAC/cinderella-girls-anime.gif" },
                    { link: "https://c.tenor.com/YYHukkdJkasAAAAC/anime-heart.gif" },
                    { link: "https://c.tenor.com/hT2lCppV4tIAAAAC/anime-i-love-you.gif" },
                ]);
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "nom"),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var mentions = (0, command_helper_1.getMentions)(msg.content)[0];
                var mention = (mentions ? "<@!" + mentions + ">" : undefined);
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
                ]);
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
        triggerfunc: (msg) => lodash_1.default.startsWith(lodash_1.default.toLower(msg.content), "emoji vote "),
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                if (msg.attachments.size == 1) {
                    var atta = msg.attachments.first();
                    msg.delete();
                    if (atta.height == atta.width) {
                        var votemsg = yield msg.channel.send({
                            content: "<@!" + msg.member.id + "> would like to add :" + lodash_1.default.words(msg.content)[2] + ":",
                            files: [atta.url]
                        });
                        votemsg.react("👍");
                        votemsg.react("👎");
                        var ej = [];
                        var evk = "emojivotes";
                        if (yield app_1.db.exists(evk))
                            ej = yield app_1.db.get(evk);
                        //ej.push({msgid:votemsg.id,finishes});
                        var repliedmsg = yield msg.channel.send("`Vote started, and will conclude in 24hours! It will then automatically be added when at least 5 people upvoted.\nGood luck! (This info disappears in 60s.)`");
                        setTimeout(() => { repliedmsg.delete(); }, 60000);
                    }
                    else {
                        var repliedmsg = yield msg.reply("Please fix the proportion of the moji you do like to add! (It needs to be 1:1)");
                        setTimeout(() => { repliedmsg.delete(); }, 10000);
                    }
                }
                else {
                    var repliedmsg = yield msg.reply("You need to have an image to use for the emoji!");
                    setTimeout(() => { repliedmsg.delete(); }, 10000);
                }
            });
        }
    },
    {
        prefix: true, typeofcmd: icommands_1.TypeOfCmd.Action, messagecontent: "marry",
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
function addActionToStatistic(action, msg) {
    db_helper_1.DBHelper.increase(app_1.db, "action::" + action.key + "sSent::" + msg.member.id + "", 1);
    if (msg.mentions && msg.mentions.repliedUser)
        db_helper_1.DBHelper.increase(app_1.db, "action::" + action.key + "sReceived::" + (action.target ? action.target : msg.mentions.repliedUser.id), 1);
}
function simpleReactEmbed(links, msg, action) {
    var fields = {
        sender: "<@!" + msg.member.id + ">",
        repliant: (!!action.target ? action.target : mod_1.MessageHelper.getRepliantsVisibleName(msg)),
        action
    };
    var header = "<%= _.upperFirst(action.singular) %>!";
    var template = "<%= sender %> <%= action.plural %> <%= repliant %>!";
    if (action.defaultHeader)
        header = action.defaultHeader;
    if (action.defaultTemplate)
        template = action.defaultTemplate;
    if (!!action.noTargetTemplate)
        if (action.target == msg.member.id || !action.target) {
            template = action.noTargetTemplate;
        }
    var linkId = Math.floor(Math.random() * links.length);
    var link = links[linkId].link;
    if (links[linkId].template)
        template = (0, command_helper_1.getRandom)(links[linkId].template);
    if (links[linkId].header)
        header = (0, command_helper_1.getRandom)(links[linkId].header);
    return new Discord.MessageEmbed()
        .setColor('#FFD35D')
        .setTitle(lodash_1.default.template(header)(fields))
        .setDescription(lodash_1.default.template(template)(fields))
        .setImage(link);
}
function defaultReactionHandler(msg, action, defaultGifs) {
    return __awaiter(this, void 0, void 0, function* () {
        //var gifkey="actionGIFs::"+action.key;
        //var links:{link:string,template:string,special:any}[]=[];
        /**if(db.exists(gifkey)){
            var gifs = db.get(gifkey)
        } else {
            db.put(gifkey,defaultGifs)
        }*/
        msg.channel.send({ embeds: [simpleReactEmbed(defaultGifs, msg, action)] });
        addActionToStatistic(action, msg);
    });
}
//# sourceMappingURL=trusted.js.map