import * as Discord from 'discord.js';
import { beeToken, bobToken } from './env';
import level from 'level-ts';
import { MasterCommands } from './CmdGroups/master';
import { SimplePerRules } from './CmdGroups/command.helper';
import Level from 'level-ts';
import { DBHelper } from './db.helper';
import { TrustedCommands } from './CmdGroups/trusted';
import { BobCommands } from './CmdGroups/bobjokes';
export let clientBee = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });
export let clientBob = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

var _db = undefined;


export let db = new level('./database');

async function GenerealReadyAsync(e)  {
	console.log(`Logged in as ${e}!`);
	let logins = await DBHelper.getCheckd(db, "logins", 1);
	console.log(`Logged in for the ${logins} time!`);
	await db.put('logins', ++logins);
}

clientBee.on('ready', GenerealReadyAsync);
clientBob.on('ready', GenerealReadyAsync);

clientBee.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

clientBee.on('messageCreate', async message => {
	//console.log("message..." + (await message.content))
	// Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
	if(!SimplePerRules(MasterCommands, message))
		SimplePerRules(TrustedCommands, message);

	if (message.content.substr(0, 2) === 'b ' && message.member.roles.cache.some((a) => a.id == "854467063677976586")) {
		if (message.content === 'b help') {

		}

		if (message.content === 'b ping') {
			// Send "pong" to the same channel
			const exampleEmbed = new Discord.MessageEmbed()
				//	.setColor('#0099ff')
				.setTitle('Pong!')
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
			let m = await message.channel.send({ embeds: [exampleEmbed] });
		}

		if (message.content.substr(0, 6) === 'b poll') {
			await message.delete();

			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle('Question!')
				.setAuthor(message.member.displayName)
				.setDescription(message.content.substr(7))

			let m = await message.channel.send({ embeds: [exampleEmbed] })

			await m.react('✅')
			await m.react('🔘')
			m.react('❌')
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
});

clientBob.on('messageCreate', async message => {
	//console.log("message..." + (await message.content))
	// Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
	
	SimplePerRules(BobCommands, message);
});

clientBee.login(beeToken);
clientBob.login(bobToken);