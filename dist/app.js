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
exports.BeeBotApps = exports._BeeBotApps = exports.BeeWebserverApplication = exports.BeeApplication = exports.randomEvents = exports.db = exports.clientBob = exports.clientBee = exports.EnvFile = void 0;
exports.EnvFile = "BeeToken.json";
const Logging_1 = require("supernode/Base/Logging");
const Environment_1 = require("supernode/Base/Environment");
const process_1 = __importDefault(require("process"));
if (!Environment_1.Environment.checkExists(exports.EnvFile)) {
    Environment_1.Environment.save(exports.EnvFile, { envV: 0, beeToken: "NoTokenYet", bobToken: "NoTokenYet" });
    Logging_1.Logging.log("There was no config File yet, it has been written to: " + Environment_1.Environment.getEnvFilePath(exports.EnvFile + "\nBe sure to add the Tokens there."));
    process_1.default.exit(-1);
}
let Env = Environment_1.Environment.load("BeeToken.json");
if (Env.beeToken == "NoTokenYet") {
    Logging_1.Logging.log("There was a config File yet, but it's missing the Tokens, find it here: " + Environment_1.Environment.getEnvFilePath(exports.EnvFile + "\nBe sure to add the Tokens there."));
    process_1.default.exit(-1);
}
const Discord = __importStar(require("discord.js"));
const level_ts_1 = __importDefault(require("level-ts"));
const master_1 = require("./CmdGroups/master");
const command_helper_1 = require("./CmdGroups/command.helper");
const db_helper_1 = require("./db.helper");
const everyone_1 = require("./CmdGroups/everyone");
const trusted_1 = require("./CmdGroups/trusted");
const bobjokes_1 = require("./CmdGroups/bobjokes");
const Application_1 = require("supernode/Base/Application");
const ApplicationCollection_1 = require("supernode/Base/ApplicationCollection");
const ExpressApplication_1 = require("supernode/Base/ExpressApplication");
const random_1 = require("./CmdGroups/random");
const mod_1 = require("supernode/Discord/mod");
exports.clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
exports.clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
exports.db = new level_ts_1.default('./database');
exports.randomEvents = new random_1.RandomEvents();
function GenerealReadyAsync(e) {
    return __awaiter(this, void 0, void 0, function* () {
        Logging_1.Logging.log(`Logged in as ${e.user.tag}!`);
        let logins = yield db_helper_1.DBHelper.getCheckd(exports.db, "logins", 1);
        yield exports.db.put('logins', ++logins);
        exports.randomEvents.start();
    });
}
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
class BeeApplication {
    constructor(beeToken, bobToken) {
        this.Type = Application_1.TypeOfApplication.BackgroundProcess;
        this.uid = "BeeBot Application";
        this.beeToken = beeToken;
        this.bobToken = bobToken;
    }
    error(eventdata) {
        Logging_1.Logging.log(eventdata);
    }
    exit(eventdata) {
        Logging_1.Logging.log(eventdata);
    }
    db() { return exports.db; }
    init() {
        BeeApplication.hasStarted = true;
        exports.clientBee.on('ready', GenerealReadyAsync);
        exports.clientBob.on('ready', GenerealReadyAsync);
        exports.clientBee.on('interaction', (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            if (interaction.commandName === 'ping') {
                yield interaction.reply('Pong!');
            }
        }));
        exports.clientBee.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            //Logging.log("message..." + (await message.content))
            // Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
            var resFullreport = new command_helper_1.ResultReport(false, false, 0, 0);
            resFullreport.add((0, command_helper_1.SimplePerRules)(everyone_1.EveryoneCommands, message));
            resFullreport.add((0, command_helper_1.SimplePerRules)(master_1.MasterCommands, message));
            resFullreport.add((0, command_helper_1.SimplePerRules)(trusted_1.TrustedCommands, message));
            resFullreport.report();
            if (message.content.substr(0, 2) === 'b ' && message.member.roles.cache.some((a) => a.id == "854467063677976586")) {
                if (message.content === 'b help') {
                }
                if (message.content === 'b ping') {
                    // Send "pong" to the same channel
                    const exampleEmbed = new Discord.MessageEmbed()
                        //	.setColor('#0099ff')
                        .setTitle('Pong!');
                    //	.setURL('https://discord.js.org/')
                    //	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    //	.setDescription('Some description here')
                    //	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //	.addFields(
                    //		{ name: 'Regular field title', value: 'Some value here' },
                    //		{ name: '\u200B', value: '\u200B' },
                    //		{ name: 'Inline field title', value: 'Some value here', inline: true },
                    //		{ name: 'Inline field title', value: 'Some value here', inline: true },
                    //	)
                    //	.addField('Inline field title', 'Some value here', true)
                    //	.setImage('https://media1.tenor.com/images/a355767951753e940a3d814b297d3eb3/tenor.gif?itemid=17797226')
                    //	.setTimestamp()
                    //	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
                    let m = yield message.channel.send({ embeds: [exampleEmbed] });
                }
                if (message.content.substr(0, 6) === 'b poll') {
                    yield message.delete();
                    let exampleEmbed = new Discord.MessageEmbed()
                        .setTitle('Question!')
                        .setAuthor(message.member.displayName)
                        .setDescription(message.content.substr(7));
                    let m = yield message.channel.send({ embeds: [exampleEmbed] });
                    yield m.react('✅');
                    yield m.react('🔘');
                    m.react('❌');
                }
            }
        }));
        exports.clientBee.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
            // 'accept-divorce'
            // 'reject-divorce'
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
            console.log(UID);
            console.log(interaction.user.id);
            if (otherPerson.author.id == interaction.user.id && (interaction.component.customId == "accept-marriage" || interaction.component.customId == "reject-marriage")) {
                // TODO: make switch
                if (interaction.component.customId == "accept-marriage") {
                    let links = [
                        "https://c.tenor.com/gj75w2kkqngAAAAC/tonikaku-kawaii-tonikaku.gif",
                        "https://c.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif",
                        "https://c.tenor.com/3OYmSePDSVUAAAAC/black-clover-licht.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Love is in the air!')
                        .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(repliedTo)} is now married to ${mod_1.MessageHelper.getSendersVisibleName(otherPerson)}.`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    var asker = yield exports.db.get(`user${repliedTo.author.id}`);
                    var recv = yield exports.db.get(`user${otherPerson.author.id}`);
                    var askObj = new MarrigeHelper(asker);
                    var recObj = new MarrigeHelper(recv);
                    var newAskData = askObj.addData(otherPerson.author.id);
                    var newRecData = recObj.addData(repliedTo.author.id);
                    if (newAskData == false || newRecData == false) {
                        yield interaction.reply({ content: "user is already married ...", ephemeral: true });
                        return;
                    }
                    else {
                        yield exports.db.put(`user${repliedTo.author.id}`, newAskData);
                        yield exports.db.put(`user${otherPerson.author.id}`, newRecData);
                    }
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
                else if (interaction.component.customId == "reject-marriage") {
                    let links = [
                        "https://c.tenor.com/lWwk7j4-_QIAAAAC/oreimo-anime.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Love is not in the air...')
                        .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(otherPerson)} is just rejected ${mod_1.MessageHelper.getSendersVisibleName(repliedTo)}.....`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
            }
            else if (repliedTo.author.id == interaction.user.id && (interaction.component.customId == 'accept-divorce' || interaction.component.customId == 'reject-divorce')) {
                // TODO: make switch
                if (interaction.component.customId == 'accept-divorce') {
                    let links = [
                        "https://c.tenor.com/gtDJpK50s4UAAAAC/air-gear-agito.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Love is not in the air....')
                        .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(repliedTo)} is now divorced to ${mod_1.MessageHelper.getSendersVisibleName(otherPerson)}.`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    var asker = yield exports.db.get(`user${repliedTo.author.id}`);
                    var recv = yield exports.db.get(`user${otherPerson.author.id}`);
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
                            yield exports.db.put(`user${repliedTo.author.id}`, newAskData);
                            yield exports.db.put(`user${otherPerson.author.id}`, newRecData);
                        }
                        else {
                            yield interaction.reply({ content: "You cant divorce other people", ephemeral: true });
                            return;
                        }
                    }
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
                else if (interaction.component.customId == "reject-divorce") { //<- should be divorce ?
                    let links = [
                        "https://c.tenor.com/pTPTKYgD4gwAAAAd/divorce-flip-book.gif"
                    ];
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Love is still in the air!')
                        .setDescription(`${mod_1.MessageHelper.getSendersVisibleName(repliedTo)} is just cancled the divorce to ${mod_1.MessageHelper.getSendersVisibleName(otherPerson)}.....`)
                        .setImage(links[Math.floor(Math.random() * links.length)]);
                    yield msg.edit({ embeds: [exampleEmbed], components: [] });
                }
            }
            else {
                yield interaction.reply({ content: "you were not asked", ephemeral: true });
            }
        }));
        exports.clientBob.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            (0, command_helper_1.SimplePerRules)(bobjokes_1.BobCommands, message);
        }));
    }
    run(eventdata) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.clientBee.login(Env.beeToken);
            exports.clientBob.login(Env.bobToken);
        });
    }
}
exports.BeeApplication = BeeApplication;
BeeApplication.hasStarted = false;
class BeeWebserverApplication extends ExpressApplication_1.ExpressApplication {
    constructor() {
        super(...arguments);
        this.subdomain = "bee";
        this.domain = "sayore.de";
        this.uid = `BeeWebserver (${this.subdomain}.${this.domain})`;
        this.needsSafeMode = Application_1.SafetyMode.NeedsCatch;
        this.typeOfApplication = Application_1.TypeOfApplication.Express;
    }
    error(eventdata) {
    }
    exit(eventdata) {
    }
    init(eventdata) {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }
}
exports.BeeWebserverApplication = BeeWebserverApplication;
class _BeeBotApps extends ApplicationCollection_1.ApplicationCollection {
    constructor() {
        super();
    }
    init() {
        this.applications = [
            new BeeApplication(Env.beeToken, Env.bobToken),
            new BeeWebserverApplication(80)
        ];
    }
}
exports._BeeBotApps = _BeeBotApps;
exports.BeeBotApps = new _BeeBotApps();
/** Autorun if not started externally */
setTimeout(() => {
    if (!BeeApplication.hasStarted) {
        let botApp = new BeeApplication(Env.beeToken, Env.bobToken);
        botApp.init();
        botApp.run({});
    }
}, 1200);
//# sourceMappingURL=app.js.map