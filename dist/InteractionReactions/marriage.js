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
exports.MarriageReactions = void 0;
const Discord = __importStar(require("discord.js"));
const MessageHelper_1 = require("supernode/Discord/MessageHelper");
const app_1 = require("../app");
class MarrigeHelper {
    constructor(json) {
        this.jsonObj = json;
    }
    addData(uuid) {
        if (!!this.jsonObj["MarrigeID"]) {
            return false;
        }
        else {
            this.jsonObj.MarrigeID = uuid;
            return this.jsonObj;
        }
    }
    removeData() {
        if (!!this.jsonObj["MarrigeID"]) {
            delete this.jsonObj["MarrigeID"];
            return this.jsonObj;
        }
        else {
            return false;
        }
    }
}
exports.MarriageReactions = [
    {
        customId: 'none',
        typeOfInteraction: "Button",
        always: true,
        isHalting: false,
        reaction: (interaction, clicker) => {
            if (!interaction.isButton())
                return;
            console.log("ALW Clicked! " + interaction.customId);
            console.log("ALW Clicked by " + clicker.id);
        }
    },
    {
        customId: 'accept-marriage',
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!interaction.isButton())
                return;
            var msg = interaction.message;
            const repliedTo = yield msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = yield repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (((_a = msg.mentions) === null || _a === void 0 ? void 0 : _a.repliedUser) ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?");
            let links = [
                "https://c.tenor.com/gj75w2kkqngAAAAC/tonikaku-kawaii-tonikaku.gif",
                "https://c.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif",
                "https://c.tenor.com/3OYmSePDSVUAAAAC/black-clover-licht.gif"
            ];
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Love is in the air!')
                .setDescription(`${MessageHelper_1.MessageHelper.getSendersVisibleName(repliedTo)} is now married to ${MessageHelper_1.MessageHelper.getSendersVisibleName(otherPerson)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)]);
            var asker = yield app_1.db.get(`user${repliedTo.author.id}`);
            var recv = yield app_1.db.get(`user${otherPerson.author.id}`);
            var askObj = new MarrigeHelper(asker);
            var recObj = new MarrigeHelper(recv);
            var newAskData = askObj.addData(otherPerson.author.id);
            var newRecData = recObj.addData(repliedTo.author.id);
            if (newAskData == false || newRecData == false) {
                yield interaction.reply({ content: "user is already married ...", ephemeral: true });
                return;
            }
            else {
                yield app_1.db.put(`user${repliedTo.author.id}`, newAskData);
                yield app_1.db.put(`user${otherPerson.author.id}`, newRecData);
            }
            yield msg.edit({ embeds: [exampleEmbed], components: [] });
        })
    },
    {
        customId: 'reject-marriage',
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if (!interaction.isButton())
                return;
            console.log("Clicked! " + interaction.customId);
            console.log("Clicked by " + clicker.id);
            var msg = interaction.message;
            const repliedTo = yield msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = yield repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (((_b = msg.mentions) === null || _b === void 0 ? void 0 : _b.repliedUser) ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?");
            if (otherPerson.author.id == interaction.user.id && (interaction.customId == "accept-marriage" || interaction.customId == "reject-marriage")) {
                // TODO: make switch
                if (interaction.customId == "accept-marriage") {
                }
                else if (interaction.customId == "reject-marriage") {
                    let links = [
                        "https://c.tenor.com/lWwk7j4-_QIAAAAC/oreimo-anime.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Love is not in the air...')
                        .setDescription(`${MessageHelper_1.MessageHelper.getSendersVisibleName(otherPerson)} is just rejected ${MessageHelper_1.MessageHelper.getSendersVisibleName(repliedTo)}.....`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
            }
        })
    },
    {
        customId: 'accept-divorce',
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            if (!interaction.isButton())
                return;
            console.log("Clicked! " + interaction.customId);
            console.log("Clicked by " + clicker.id);
            var msg = interaction.message;
            const repliedTo = yield msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = yield repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (((_c = msg.mentions) === null || _c === void 0 ? void 0 : _c.repliedUser) ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?");
            if (repliedTo.author.id == interaction.user.id && (interaction.customId == 'accept-divorce' || interaction.customId == 'reject-divorce')) {
                // TODO: make switch
                if (interaction.customId == 'accept-divorce') {
                    let links = [
                        "https://c.tenor.com/gtDJpK50s4UAAAAC/air-gear-agito.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Love is not in the air....')
                        .setDescription(`${MessageHelper_1.MessageHelper.getSendersVisibleName(repliedTo)} is now divorced to ${MessageHelper_1.MessageHelper.getSendersVisibleName(otherPerson)}.`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    var asker = yield app_1.db.get(`user${repliedTo.author.id}`);
                    var recv = yield app_1.db.get(`user${otherPerson.author.id}`);
                    var askObj = new MarrigeHelper(asker);
                    var recObj = new MarrigeHelper(recv);
                    var MarrigeID1 = recObj.jsonObj["MarrigeID"];
                    var MarrigeID2 = askObj.jsonObj["MarrigeID"];
                    var newAskData = askObj.removeData(); // removeData => divorce()
                    var newRecData = recObj.removeData();
                    if (newAskData == false || newRecData == false) {
                        yield interaction.reply({ content: "User isnt married", ephemeral: true });
                        return;
                    }
                    else { //
                        if (MarrigeID2 == otherPerson.author.id) {
                            yield app_1.db.put(`user${repliedTo.author.id}`, newAskData);
                            yield app_1.db.put(`user${otherPerson.author.id}`, newRecData);
                        }
                        else {
                            yield interaction.reply({ content: "You cant divorce other people", ephemeral: true });
                            return;
                        }
                    }
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
            }
        })
    }, {
        customId: 'reject-divorce',
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => __awaiter(void 0, void 0, void 0, function* () {
            var _d;
            if (!interaction.isButton())
                return;
            console.log("Clicked! " + interaction.customId);
            console.log("Clicked by " + clicker.id);
            var msg = interaction.message;
            const repliedTo = yield msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = yield repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (((_d = msg.mentions) === null || _d === void 0 ? void 0 : _d.repliedUser) ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?");
            if (interaction.customId == "reject-divorce") { //<- should be divorce ?
                let links = [
                    "https://c.tenor.com/pTPTKYgD4gwAAAAd/divorce-flip-book.gif"
                ];
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Love is still in the air!')
                    .setDescription(`${MessageHelper_1.MessageHelper.getSendersVisibleName(repliedTo)} is just cancled the divorce to ${MessageHelper_1.MessageHelper.getSendersVisibleName(otherPerson)}.....`)
                    .setImage(links[Math.floor(Math.random() * links.length)]);
                yield msg.edit({ embeds: [exampleEmbed], components: [] });
            }
        })
    }
];
//# sourceMappingURL=marriage.js.map