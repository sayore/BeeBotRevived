import * as Discord from 'discord.js';
import _ from 'lodash';
import { MessageHelper } from 'supernode/Discord/MessageHelper';
import { db } from '../app';
import { DivorceRequest } from '../Data/DivorceRequest';
import { Userdata, userkey } from '../Helper/Userdata';
import { IReaction } from "./ireaction";

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

            // Hier bekommen wir den User, der auf den Button geklickt hat
            const interactor = await Userdata.getUser(interaction.member.user.id)

            // Hier bekommen wir den User, der die Nachricht geschrieben hat
            const sender = await Userdata.getUser((await (await msg.channel.messages.fetch(msg.reference.messageId)).member.fetch()).user.id);

            //interaction.channel.send(sender.name + " " + interactor.name);

            if(sender.extra.requestedMarriageTo.includes(interactor.id) && interactor.extra.requestedMarriageFrom.includes(sender.id)){
                let links = [
                    "https://c.tenor.com/gj75w2kkqngAAAAC/tonikaku-kawaii-tonikaku.gif",
                    "https://c.tenor.com/kftblVYVuSsAAAAC/anime-incest.gif",
                    "https://c.tenor.com/3OYmSePDSVUAAAAC/black-clover-licht.gif"
                ]
    
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Love is in the air!')
                    .setDescription(`${sender.name} is now married to ${interactor.name}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)])

                sender.marriedTo.push(interactor.id)
                interactor.marriedTo.push(sender.id)

                //save
                sender.save()
                interactor.save()

                await msg.edit({ embeds: [exampleEmbed], components: [] })
            }
            
            return;

        }
    },
    {
        customId: 'reject-marriage',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            var msg = <Discord.Message>interaction.message;

            // Hier bekommen wir den User, der auf den Button geklickt hat
            const interactor = await Userdata.getUser(interaction.member.user.id)

            // Hier bekommen wir den User, der die Nachricht geschrieben hat
            const sender = await Userdata.getUser((await (await msg.channel.messages.fetch(msg.reference.messageId)).member.fetch()).user.id);

            //interaction.channel.send(sender.name + " " + interactor.name);

            if(sender.extra.requestedMarriageTo.includes(interactor.id) && interactor.extra.requestedMarriageFrom.includes(sender.id)){
                let links = [
                    "https://c.tenor.com/lWwk7j4-_QIAAAAC/oreimo-anime.gif"
                ]

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Love is not in the air...')
                    .setDescription(`${interactor.name} has just rejected ${sender.name}.....`)
                    .setImage(links[Math.floor(Math.random() * links.length)])

                await msg.edit({ embeds: [exampleEmbed], components: [] })
            }
            
            return;
        }
    },
    {
        customId: 'accept-divorce',
        triggerfunc:(interaction: Discord.Interaction) => {
            if (!interaction.isButton()) return;
            return _.startsWith(_.toLower(interaction.customId), "accept-divorce")
        },
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction) => {
            if (!interaction.isButton()) return;
            var msg = <Discord.Message>interaction.message;
            
            //interaction.channel.send("button press");

            // Hier bekommen wir den User, der auf den Button geklickt hat
            const interactor = await Userdata.getUser(interaction.member.user.id)
            if(!interactor.extra.requestedDivorceFrom) { interaction.channel.send("no request found: data"+JSON.stringify(interactor.extra.requestedDivorceFrom)); return;}
            var divorcee = await Userdata.getUser((<DivorceRequest>interactor.extra.requestedDivorceFrom).target)

            if(!interactor.marriedTo.includes(divorcee.id)){interaction.channel.send("not married to "+divorcee.id); return;}
            if(interactor.marriedTo.includes(divorcee.id)){
                let links = [
                    "https://c.tenor.com/gtDJpK50s4UAAAAC/air-gear-agito.gif"
                ]
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Love is not in the air....')
                    .setDescription(`${interactor.name} is now divorced from ${divorcee.name}.`)
                    .setImage(links[Math.floor(Math.random() * links.length)])


                // Remove from both
                divorcee.marriedTo = divorcee.marriedTo.filter(x => x != interactor.id)
                interactor.marriedTo = interactor.marriedTo.filter(x => x != divorcee.id)

                divorcee.save()
                interactor.save()

                await msg.edit({ embeds: [exampleEmbed], components: [] })
            }
        }
    }, {
        customId: 'reject-divorce',
        typeOfInteraction: "Button",
        reaction: async (interaction: Discord.Interaction, clicker) => {
            if (!interaction.isButton()) return;
            var msg = <Discord.Message>interaction.message;

            // Hier bekommen wir den User, der auf den Button geklickt hat
            const interactor = await Userdata.getUser(interaction.member.user.id)

            // Hier bekommen wir den User, der die Nachricht geschrieben hat
            const sender = await Userdata.getUser((await (await msg.channel.messages.fetch(msg.reference.messageId)).member.fetch()).user.id);

            //interaction.channel.send(sender.name + " " + interactor.name);

            if(interactor.marriedTo.includes(sender.id)){
                let links = [
                    "https://c.tenor.com/pTPTKYgD4gwAAAAd/divorce-flip-book.gif"
                ]
        
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Love is still in the air!')
                    .setDescription(`Cancelled divorce between ${interactor.name} and ${sender.name}.`)
                    .setImage(links[Math.floor(Math.random()*links.length)])

                await msg.edit({embeds:[exampleEmbed], components:[]})
            }
        }
    }
];