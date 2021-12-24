import * as Discord from 'discord.js';
import { MessageHelper } from 'supernode/Discord/MessageHelper';
import { db } from '../app';
import { IReaction } from "./ireaction";

class MarrigeHelper {

    jsonObj: any;
    constructor(json: any) {
        this.jsonObj = json;
    }

    addData(uuid: string) {

        if (!!this.jsonObj["partner"]) {
            return false;
        } else {
            this.jsonObj.partner = uuid;
            return this.jsonObj;
        }

    }

    removeData() {

        if (!!this.jsonObj["partner"]) {
            delete this.jsonObj["partner"];
            return this.jsonObj;
        } else {
            return false;
        }


    }

}

export let MarriageReactions: IReaction[] = [
    {
        customId: 'none',
        typeOfInteraction: "Button",
        always: true,
        isHalting: false,
        reaction: (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            console.log("ALW Clicked! " + interaction.customId)
            console.log("ALW Clicked by " + clicker.id)
        }
    },
    {
        customId: 'accept-marriage',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            var msg = <Discord.Message>interaction.message;
            const repliedTo = await msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = await repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (msg.mentions?.repliedUser ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?")

            let links = [
                "https://c.tenor.com/gj75w2kkqngAAAAC/tonikaku-kawaii-tonikaku.gif",
                "https://c.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif",
                "https://c.tenor.com/3OYmSePDSVUAAAAC/black-clover-licht.gif"
            ]

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Love is in the air!')
                .setDescription(`${MessageHelper.getSendersVisibleName(repliedTo)} is now married to ${MessageHelper.getSendersVisibleName(otherPerson)}.`)
                .setImage(links[Math.floor(Math.random() * links.length)])

            var asker = await db.get(`user${repliedTo.author.id}`);
            var recv = await db.get(`user${otherPerson.author.id}`);

            var askObj = new MarrigeHelper(asker);
            var recObj = new MarrigeHelper(recv);

            var newAskData = askObj.addData(otherPerson.author.id);
            var newRecData = recObj.addData(repliedTo.author.id);

            if (newAskData == false || newRecData == false) {

                await interaction.reply({ content: "user is already married ...", ephemeral: true });
                return;
            } else {

                await db.put(`user${repliedTo.author.id}`, newAskData);
                await db.put(`user${otherPerson.author.id}`, newRecData);

            }
            await msg.edit({ embeds: [exampleEmbed], components: [] })

        }
    },
    {
        customId: 'reject-marriage',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            console.log("Clicked! " + interaction.customId)
            console.log("Clicked by " + clicker.id)

            var msg = <Discord.Message>interaction.message;
            const repliedTo = await msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = await repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (msg.mentions?.repliedUser ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?")

            if (otherPerson.author.id == interaction.user.id && (interaction.customId == "accept-marriage" || interaction.customId == "reject-marriage")) {


                // TODO: make switch
                if (interaction.customId == "accept-marriage") {

                } else if (interaction.customId == "reject-marriage") {

                    let links = [
                        "https://c.tenor.com/lWwk7j4-_QIAAAAC/oreimo-anime.gif"
                    ]

                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Love is not in the air...')
                        .setDescription(`${MessageHelper.getSendersVisibleName(otherPerson)} is just rejected ${MessageHelper.getSendersVisibleName(repliedTo)}.....`)
                        .setImage(links[Math.floor(Math.random() * links.length)])
                    await msg.edit({ embeds: [exampleEmbed], components: [] })
                }
            }
        }
    },
    {
        customId: 'accept-divorce',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            console.log("Clicked! " + interaction.customId)
            console.log("Clicked by " + clicker.id)

            var msg = <Discord.Message>interaction.message;
            const repliedTo = await msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = await repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (msg.mentions?.repliedUser ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?")

            if (repliedTo.author.id == interaction.user.id && (interaction.customId == 'accept-divorce' || interaction.customId == 'reject-divorce')) {

                // TODO: make switch
                if (interaction.customId == 'accept-divorce') {

                    let links = [
                        "https://c.tenor.com/gtDJpK50s4UAAAAC/air-gear-agito.gif"
                    ]
                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Love is not in the air....')
                        .setDescription(`${MessageHelper.getSendersVisibleName(repliedTo)} is now divorced to ${MessageHelper.getSendersVisibleName(otherPerson)}.`)
                        .setImage(links[Math.floor(Math.random() * links.length)])

                    var asker = await db.get(`user${repliedTo.author.id}`);
                    var recv = await db.get(`user${otherPerson.author.id}`);

                    var askObj = new MarrigeHelper(asker);
                    var recObj = new MarrigeHelper(recv);

                    var MarrigeID1 = recObj.jsonObj["partner"];
                    var MarrigeID2 = askObj.jsonObj["partner"];

                    var newAskData = askObj.removeData(); // removeData => divorce()
                    var newRecData = recObj.removeData();

                    if (newAskData == false || newRecData == false) {

                        await interaction.reply({ content: "User isnt married", ephemeral: true });
                        return;
                    } else { //


                        if (MarrigeID2 == otherPerson.author.id) {
                            await db.put(`user${repliedTo.author.id}`, newAskData);
                            await db.put(`user${otherPerson.author.id}`, newRecData);
                        } else {
                            await interaction.reply({ content: "You cant divorce other people", ephemeral: true });
                            return;
                        }

                    }
                    await msg.edit({ embeds: [exampleEmbed], components: [] })

                }
            }
        }
    }, {
        customId: 'reject-divorce',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            console.log("Clicked! " + interaction.customId)
            console.log("Clicked by " + clicker.id)

            var msg = <Discord.Message>interaction.message;
            const repliedTo = await msg.channel.messages.fetch(msg.reference.messageId);
            const otherPerson = await repliedTo.channel.messages.fetch(repliedTo.reference.messageId);
            // console.log(msg.mentions);
            // console.log("got here ..");
            var UID = (msg.mentions?.repliedUser ?
                (msg.mentions.repliedUser.id ?
                    msg.mentions.repliedUser.id
                    : msg.mentions.repliedUser.tag)
                : "noone?")

                if (interaction.customId == "reject-divorce"){ //<- should be divorce ?

					let links = [
						"https://c.tenor.com/pTPTKYgD4gwAAAAd/divorce-flip-book.gif"
					]
			
					const exampleEmbed = new Discord.MessageEmbed()
						.setColor('#FF0000')
						.setTitle('Love is still in the air!')
						.setDescription(`${MessageHelper.getSendersVisibleName(repliedTo)} is just cancled the divorce to ${MessageHelper.getSendersVisibleName(otherPerson)}.....`)
						.setImage(links[Math.floor(Math.random()*links.length)])
					await msg.edit({embeds:[exampleEmbed], components:[]})
				}
        }
    }
];