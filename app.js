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
const Discord = require("discord.js");
const env_1 = require("./env");
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('interaction', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    if (interaction.commandName === 'ping') {
        yield interaction.reply('Pong!');
    }
}));
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
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
            let m = yield message.channel.send(exampleEmbed);
        }
        if (message.content.substr(0, 6) === 'b poll') {
            yield message.delete();
            let exampleEmbed = new Discord.MessageEmbed()
                .setTitle('Question!')
                .setAuthor(message.member.nickname)
                .setDescription(message.content.substr(7));
            let m = yield message.channel.send(exampleEmbed);
            yield m.react('✅');
            yield m.react('🔘');
            m.react('❌');
        }
        /**
        if (message.content.substr(0, 6) === 'b pollold') {
            await message.delete();

            let m = await message.channel.send(message.member.nickname + " asks: " + message.content.substr(7));

            await m.react('✅')
            await m.react('🔘')
            m.react('❌')
        }*/
    }
}));
client.login(env_1.token);
//# sourceMappingURL=app.js.map