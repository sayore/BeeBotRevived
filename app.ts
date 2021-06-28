import * as Discord from 'discord.js';
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interaction', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.on('message',async message => {
	// Check if message starts with the Bot's Prefix AND that the user has the group to be allowed to use these Commands (Cool Kids)
	if (message.content.substr(0, 2) === 'b ' && message.member.roles.cache.some((a) => a.id =="854467063677976586")) {
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
			let m = await message.channel.send(exampleEmbed);
		}

		if (message.content.substr(0, 6) === 'b poll') {
			await message.delete();

			let exampleEmbed = new Discord.MessageEmbed()
				.setTitle('Question!')
				.setAuthor(message.member.nickname)
				.setDescription(message.content.substr(7))
					
			let m = await message.channel.send(exampleEmbed);

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

client.login('NzMyMzc3MjU4ODU3MDcwNjAy.XwzteQ.QXukuVpWgws4HpYpwZ0H5Z9fUuI');