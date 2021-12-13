"use strict";
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
exports.MasterCommands = void 0;
const app_1 = require("../app");
const MessageHelper_1 = require("supernode/Discord/MessageHelper");
const Environment_1 = require("supernode/Base/Environment");
exports.MasterCommands = [
    {
        userlimitedids: ["562640877705756690"],
        messagecontent: "hello bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("Hi master uwu");
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["bee", "access", "can", "database", "?"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply(`${(yield app_1.db) ? "yes" : "no"} uwu`);
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["add", "channel", "to", "random"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var env = Environment_1.Environment.load(app_1.EnvFile);
                if (env.randomChannels == undefined) {
                    env.randomChannels = [msg.channelId];
                }
                else {
                    if (env.randomChannels.includes(msg.channelId)) {
                        msg.reply(`channel is already added to random ev`);
                    }
                    else {
                        env.randomChannels = [...msg.channelId];
                        msg.reply(`oki uwu`);
                    }
                }
                Environment_1.Environment.save(app_1.EnvFile, env);
            });
        }
    },
    {
        triggerfunc: (msg) => {
            MessageHelper_1.MessageHelper.getRepliantsVisibleName(msg);
            if (msg.content.toString().indexOf(' ') === -1 && msg.content.toString().startsWith('<') && msg.content.toString().endsWith('>') && msg.content.toString().toLowerCase().indexOf('pat') !== -1) {
                console.log("A" + msg.mentions);
                console.log(MessageHelper_1.MessageHelper.isRepliant(msg, app_1.clientBee.user.id));
                console.log(MessageHelper_1.MessageHelper.hasRepliant(msg));
                console.log(msg);
                if (MessageHelper_1.MessageHelper.isRepliant(msg, app_1.clientBee.user.id)) {
                    return true;
                }
            }
            return false;
        },
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply(`(* -ω- )`);
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        messagecontent: "good morning bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("good morning master ʕ ᵔ//ᴥ/ᵔʔ");
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["how", "many", "last", "message"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield msg.reply("uwu let me think");
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield msg.reply(`i think ${yield app_1.db.get("msg_since_online")} times + or - 1 idk uwu *blushes*`);
                    }), 500);
                }), 500);
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["who", "master", "is", "bee"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield msg.reply("sayore is my master ***blushes*** owo");
                }), 500);
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["bee", "kick", "pleb"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield msg.reply("oki master ***blushes*** owo");
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        let guildmember = msg.mentions.members.first();
                        if (guildmember && guildmember.kickable) {
                            yield msg.mentions.members.first().kick("Master told me so uwu");
                            yield msg.channel.send("done \(◦'⌣'◦)/.");
                        }
                        else {
                            yield msg.channel.send("i cant \(◦'⌣'◦)/.");
                            yield msg.channel.send("pls dont be mad at me uwu");
                        }
                    }), 500);
                }), 500);
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        messagecontent: "bee only listens to me",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("thats right, i only listen to my master uwu (except for normal commands)");
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        messagecontent: "good bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("yay \(◦'⌣'◦)/.");
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["stfu", "bee"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("ok ʕノ)ᴥ(ヾʔ");
            });
        }
    },
    {
        userlimitedids: ["562640877705756690"],
        triggerwords: ["bee", "understood", "me"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
            });
        }
    },
];
/**
 *


        if(CheckForManyWords(msg.content,["stfu","bee"])) {
            msg.reply("ok ʕノ)ᴥ(ヾʔ");
        }
        if(CheckForManyWords(msg.content,["bee","understood","me"])) {
            msg.reply("yea i think so (⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
        }
 *
 */ 
//# sourceMappingURL=master.js.map