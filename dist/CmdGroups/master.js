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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterCommands = void 0;
const command_helper_1 = require("./command.helper");
const app_1 = require("../app");
const MessageHelper_1 = require("supernode/Discord/MessageHelper");
const Environment_1 = require("supernode/Base/Environment");
const Logging_1 = require("supernode/Base/Logging");
const lodash_1 = __importDefault(require("lodash"));
const user_1 = require("../Helper/user");
const rpg_1 = require("../RPG/rpg");
exports.MasterCommands = [
    {
        ownerlimited: true,
        triggerwords: ["bee", "access", "can", "database", "?"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply(`${(yield app_1.db) ? "yes" : "no"} uwu`);
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "event", "now"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.delete();
                app_1.randomEvents.randomAction();
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "stats"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg.content);
                msg.delete();
                let target_id = msg.member.id;
                (0, command_helper_1.getMentions)(msg.content);
                let userdata = yield (0, user_1.getUser)(target_id);
                msg.channel.send(target_id);
                msg.channel.send(JSON.stringify(userdata));
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "logthis"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                Logging_1.Logging.log(msg.content, "LogThis");
                msg.delete();
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["beesaythis"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                Logging_1.Logging.log(msg.content, "SayThis");
                msg.channel.send(msg.content.replace("beesaythis ", ""));
                msg.delete();
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "most", "money"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg.content);
                msg.delete();
                let toplist = yield app_1.db.iterateFilter((v) => { var _a; return (!!((_a = v.rpg) === null || _a === void 0 ? void 0 : _a.money)); });
                toplist = yield toplist.sort((a, b) => {
                    if (a.rpg.money == b.rpg.money)
                        return 0;
                    return a.rpg.money < b.rpg.money ? 1 : -1;
                });
                //msg.channel.send(JSON.stringify(toplist)); 
                let sToplist = "";
                for (let i = 0; i < toplist.length; i++) {
                    const v = toplist[i];
                    var membername;
                    if (toplist[i].tag) {
                        membername = toplist[i].tag;
                    }
                    else {
                        var member = yield msg.guild.members.fetch({ user: v.id });
                        membername = member.displayName;
                        (0, user_1.setUser)(member, toplist[i]);
                    }
                    sToplist += `\` ${(Math.floor(v.rpg.money).toString() + " $").padEnd(15, " ")} ${membername.padEnd(40, " ")} \`\n`;
                }
                msg.channel.send(sToplist);
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "most", "exp"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg.content);
                msg.delete();
                let toplist = (yield app_1.db.iterateFilter((v) => { return (!!v.rpg); }));
                // Loads RPG functions, without this, no "allExp()"
                for (let i = 0; i < toplist.length; i++) {
                    toplist[i].rpg = toplist[i].rpg = lodash_1.default.assignIn(new rpg_1.RPG(), toplist[i].rpg);
                    ;
                }
                toplist = yield toplist.sort((a, b) => {
                    let axp = a.rpg.allExp();
                    let bxp = b.rpg.allExp();
                    if (axp == bxp)
                        return 0;
                    return axp < bxp ? 1 : -1;
                });
                //msg.channel.send(JSON.stringify(toplist)); 
                let sToplist = "";
                for (let i = 0; i < toplist.length; i++) {
                    const v = toplist[i];
                    var membername;
                    if (toplist[i].tag) {
                        membername = toplist[i].tag;
                    }
                    else {
                        var member = yield msg.guild.members.fetch({ user: v.id });
                        membername = member.displayName;
                        (0, user_1.setUser)(member, toplist[i]);
                    }
                    sToplist += `\` ${(Math.floor(v.rpg.allExp()).toString() + " EXP").padEnd(15, " ")} ${membername.padEnd(40, " ")} \`\n`;
                }
                msg.channel.send(sToplist);
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["bee", "db"],
        cmd(msg) {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg.content);
                msg.delete();
                const iterator = app_1.db.iterate({});
                try {
                    // ? iterator.seek(...); // You can first seek if you'd like.
                    for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
                        const { key, value } = iterator_1_1.value;
                        msg.channel.send(key + ":" + value); // Useable, readable and fast!
                    } // If the end of the iterable is reached, iterator.end() is callend.
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) yield _a.call(iterator_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                yield iterator.end();
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["add", "channel", "to", "random"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                var env = Environment_1.Environment.load(app_1.EnvFile);
                if (env.randomChannels == undefined) {
                    env.randomChannels = [msg.channelId];
                }
                else {
                    if (env.randomChannels.includes(msg.channelId)) {
                        let myReply = msg.reply(`channel is already added to random ev`);
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () { msg.delete(); (yield myReply).delete(); }), 3500);
                    }
                    else {
                        env.randomChannels.push(msg.channelId);
                        msg.delete();
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
                Logging_1.Logging.log("A" + msg.mentions);
                Logging_1.Logging.log(MessageHelper_1.MessageHelper.isRepliant(msg, app_1.clientBee.user.id));
                Logging_1.Logging.log(MessageHelper_1.MessageHelper.hasRepliant(msg));
                Logging_1.Logging.log(msg);
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
        ownerlimited: true,
        messagecontent: "good morning bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("good morning master ʕ ᵔ//ᴥ/ᵔʔ");
            });
        }
    },
    {
        ownerlimited: true,
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
        ownerlimited: true,
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
        ownerlimited: true,
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
        ownerlimited: true,
        messagecontent: "bee only listens to me",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("thats right, i only listen to my master uwu (except for normal commands)");
            });
        }
    },
    {
        ownerlimited: true,
        messagecontent: "good bee",
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("yay \(◦'⌣'◦)/.");
            });
        }
    },
    {
        ownerlimited: true,
        triggerwords: ["stfu", "bee"],
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                msg.reply("ok ʕノ)ᴥ(ヾʔ");
            });
        }
    },
    {
        ownerlimited: true,
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