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
exports.BotApplication = exports.db = exports.clientBob = exports.clientBee = void 0;
const Discord = require("discord.js");
const env_1 = require("./env");
const level_ts_1 = require("level-ts");
const master_1 = require("./CmdGroups/master");
const command_helper_1 = require("./CmdGroups/command.helper");
const db_helper_1 = require("./db.helper");
const trusted_1 = require("./CmdGroups/trusted");
const bobjokes_1 = require("./CmdGroups/bobjokes");
exports.clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
exports.clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
var _db = undefined;
exports.db = new level_ts_1.default('./database');
function GenerealReadyAsync(e) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Logged in as ${e}!`);
        let logins = yield db_helper_1.DBHelper.getCheckd(exports.db, "logins", 1);
        console.log(`Logged in for the ${logins} time!`);
        yield exports.db.put('logins', ++logins);
    });
}
exports.clientBee.on('ready', GenerealReadyAsync);
exports.clientBob.on('ready', GenerealReadyAsync);
exports.clientBee.on('interaction', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    if (interaction.commandName === 'ping') {
        yield interaction.reply('Pong!');
    }
}));
exports.clientBee.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("message..." + (await message.content))
    // Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
    if (!command_helper_1.SimplePerRules(master_1.MasterCommands, message))
        command_helper_1.SimplePerRules(trusted_1.TrustedCommands, message);
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
exports.clientBob.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    command_helper_1.SimplePerRules(bobjokes_1.BobCommands, message);
}));
exports.clientBee.login(env_1.beeToken);
exports.clientBob.login(env_1.bobToken);
exports.BotApplication = {
    init() { },
    run() {
        exports.clientBee.login(env_1.beeToken);
        exports.clientBob.login(env_1.bobToken);
    }
};
//# sourceMappingURL=app.js.map