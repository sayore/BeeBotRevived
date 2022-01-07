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
var defaultEnv = { envV: 0, beeToken: "NoTokenYet", bobToken: "NoTokenYet", domain: "sayore.de", subdomain: "bee" };
if (!Environment_1.Environment.checkExists(exports.EnvFile)) {
    Environment_1.Environment.save(exports.EnvFile, defaultEnv);
    Logging_1.Logging.log("There was no config File yet, it has been written to: " + Environment_1.Environment.getEnvFilePath(exports.EnvFile + "\nBe sure to add the Tokens there."));
    process_1.default.exit(-1);
}
let Env = Environment_1.Environment.load("BeeToken.json");
if (Env.beeToken == "NoTokenYet") {
    Logging_1.Logging.log("There was a config File yet, but it's missing the Tokens, find it here: " + Environment_1.Environment.getEnvFilePath(exports.EnvFile + "\nBe sure to add the Tokens there."));
    process_1.default.exit(-1);
}
Env = Object.assign(defaultEnv, Env);
const Discord = __importStar(require("discord.js"));
const level_ts_1 = __importDefault(require("level-ts"));
const master_1 = require("./CmdGroups/master");
const command_helper_1 = require("./CmdGroups/command.helper");
const interaction_helper_1 = require("./InteractionReactions/interaction.helper");
const testreactions_1 = require("./InteractionReactions/testreactions");
const marriage_1 = require("./InteractionReactions/marriage");
const db_helper_1 = require("./db.helper");
const everyone_1 = require("./CmdGroups/everyone");
const trusted_1 = require("./CmdGroups/trusted");
const random_1 = require("./CmdGroups/random");
const rpg_1 = require("./CmdGroups/rpg");
const bobjokes_1 = require("./CmdGroups/bobjokes");
const Application_1 = require("supernode/Base/Application");
const ApplicationCollection_1 = require("supernode/Base/ApplicationCollection");
const ExpressApplication_1 = require("supernode/Base/ExpressApplication");
const user_1 = require("./Helper/user");
exports.clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
exports.clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"] });
exports.db = new level_ts_1.default('./database');
require("./DBUpdates/user-to-jsonuser");
exports.randomEvents = new random_1.RandomEvents();
Logging_1.Logging.setLogTarget(Logging_1.LogLevel.Unknown, Logging_1.LogTarget.All);
Logging_1.Logging.setLogTarget(Logging_1.LogLevel.Testing, Logging_1.LogTarget.Textfile);
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
        exports.clientBee.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            //Logging.log("message..." + (await message.content))
            // Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
            var user = yield (0, user_1.getUser)(message.member.id, message);
            var resFullreport = new command_helper_1.ResultReport(false, false, 0, 0);
            //console.log(resFullreport)
            resFullreport = yield (0, command_helper_1.SimplePerRules)(everyone_1.EveryoneCommands, message, user, resFullreport);
            //console.log(resFullreport)
            //resFullreport.report()
            resFullreport = yield (0, command_helper_1.SimplePerRules)(master_1.MasterCommands, message, user, resFullreport);
            //console.log(resFullreport)
            //resFullreport.report()
            resFullreport = yield (0, command_helper_1.SimplePerRules)(trusted_1.TrustedCommands, message, user, resFullreport);
            //console.log(resFullreport)
            //resFullreport.report()
            resFullreport = yield (0, command_helper_1.SimplePerRules)(rpg_1.RPGCommands, message, user, resFullreport);
            resFullreport.report();
            yield (0, user_1.setUser)(message.member, user);
        }));
        exports.clientBee.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
            // 'accept-divorce'
            // 'reject-divorce'
            let simpreacts = (0, interaction_helper_1.SimpleReactionsPerRules)(testreactions_1.TestReactions, interaction, new command_helper_1.ResultReport(false, false, 0, 0));
            if (simpreacts.executed)
                return;
            simpreacts.add((0, interaction_helper_1.SimpleReactionsPerRules)(marriage_1.MarriageReactions, interaction, new command_helper_1.ResultReport(false, false, 0, 0)));
            simpreacts.report();
        }));
        exports.clientBob.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            var user = yield (0, user_1.getUser)(message.member.id, message);
            (0, command_helper_1.SimplePerRules)(bobjokes_1.BobCommands, message, user);
            //setUser(message.member, user);
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
        this.subdomain = Env.subdomain;
        this.domain = Env.domain;
        this.standalone = false;
        this.uid = `BeeWebserver (${this.subdomain}.${this.domain})`;
        this.needsSafeMode = Application_1.SafetyMode.NeedsCatch;
        this.typeOfApplication = Application_1.TypeOfApplication.Express;
    }
    error(eventdata) {
        Logging_1.Logging.log(eventdata);
    }
    exit(eventdata) {
        Logging_1.Logging.log(eventdata);
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
        let beewebApp = new BeeWebserverApplication(80);
        beewebApp.standalone = true;
        beewebApp.init();
        beewebApp.run();
    }
}, 1200);
//# sourceMappingURL=app.js.map