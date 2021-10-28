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
exports.BeeBotApps = exports._BeeBotApps = exports.BeeWebserverApplication = exports.BeeApplication = exports.db = exports.clientBob = exports.clientBee = void 0;
const Discord = __importStar(require("discord.js"));
const env_1 = require("./env");
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
exports.clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
exports.clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
exports.db = new level_ts_1.default('./database');
function GenerealReadyAsync(e) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Logged in as ${e}!`);
        let logins = yield db_helper_1.DBHelper.getCheckd(exports.db, "logins", 1);
        console.log(`Logged in for the ${logins} time!`);
        yield exports.db.put('logins', ++logins);
    });
}
class BeeApplication {
    constructor(beeToken, bobToken) {
        this.Type = Application_1.TypeOfApplication.BackgroundProcess;
        this.uid = "BeeBot Application";
        this.beeToken = beeToken;
        this.bobToken = bobToken;
    }
    error(eventdata) {
        console.log(eventdata);
    }
    exit(eventdata) {
        console.log(eventdata);
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
            //console.log("message..." + (await message.content))
            // Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
            (0, command_helper_1.SimplePerRules)(everyone_1.EveryoneCommands, message);
            if (!(0, command_helper_1.SimplePerRules)(master_1.MasterCommands, message))
                (0, command_helper_1.SimplePerRules)(trusted_1.TrustedCommands, message);
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
        exports.clientBob.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            (0, command_helper_1.SimplePerRules)(bobjokes_1.BobCommands, message);
        }));
    }
    run(eventdata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.beeToken)
                exports.clientBee.login(this.beeToken);
            else
                exports.clientBee.login(env_1.beeToken);
            if (this.bobToken)
                exports.clientBob.login(this.bobToken);
            else
                exports.clientBob.login(env_1.bobToken);
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
// TODO: Instead of initing manually here should be a lookup possible  so the webserver can set the applications settings.
class _BeeBotApps extends ApplicationCollection_1.ApplicationCollection {
    constructor() {
        super();
    }
    init() {
        this.applications = [
            new BeeApplication(this.beeToken, this.bobToken),
            new BeeWebserverApplication(80)
        ];
    }
}
exports._BeeBotApps = _BeeBotApps;
exports.BeeBotApps = new _BeeBotApps();
/** Autorun if not started externally */
setTimeout(() => {
    if (!BeeApplication.hasStarted) {
        let botApp = new BeeApplication(env_1.beeToken, env_1.bobToken);
        botApp.init();
        botApp.run({});
    }
}, 1200);
//# sourceMappingURL=app.js.map