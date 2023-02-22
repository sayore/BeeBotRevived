import * as Discord from 'discord.js';
import { clientBee, clientBob } from '../app';
import { ICommand } from "./ICommand";

let jokes = [
    `What do you call a flying turtle?\n||A shellicopter.||`,
    `My pet turtle died.
I’m not upset, just shell-shocked.`,
    `Where does a turtle go when it’s raining?
||A shell-ter.||`,
    `What do you call a famous turtle?
||A shell-ebrity.||`,
    `My friend and I went to a turtle pun class yesterday.
It tortoise nothing.`,
    `How does a turtle feel after being electrocuted?
||Shell-shocked.||`,
    `What do you get when you cross a turtle with a porcupine?
A slowpoke.`,
    `What do you call a turtle chef?
||A slow cooker.||`,
    `What do turtles do when one of them has a birthday?
They have a shell-ebration.`,
    `What do you call a truck-load of tortoises crashing into a train-load of terrapins?
A turtle disaster.`,
    `What do you call a turtle who takes up photography?
||A snapping turtle.||`,
    `What kind of photos do turtles take?
Shell-fies.`,
`Why do turtles never forget?
Because they have turtle recall.`,
`Why did the turtle cross the road?
To get to the shell station.`,
`I got invited to a costume party, so I went as a turtle.
I had a shell of a time.`,
`What do you get if you cross a turtle with a giraffe and a kangaroo?
A turtle neck jumper.`,
`How do turtles communicate with each other?
With shell phones.`,
`What do you call a turtle who is only awake at night?
A noc-turtle.`,
`What does a turtle need to ride a bike?
A shell-met.`,
`I went into a bookstore to ask if they had any books about turtles.
The cashier asked, “Hardback?”
I said, “Yeah, and little heads!”`,
`My favorite teacher at school was Mrs. Turtle.
Strange name, but she tortoise well.`,
`What do you call a turtle with six feet?
A six-foot turtle!`,
`What’s a turtle’s favorite sandwich?
Seanut butter and jellyfish.`,
`What do you call a famous turtle?
A shellebrity.`,
`Where do you send turtles who commit crimes?
To the shell block.`,
`Why is turtle wax so expensive?
Because their ears are so small.`,
`What does a turtle do on its birthday?
It shellebrates.`,
`Why can’t a turtle eat food from McDonald’s?
Because a turtle is too slow for fast food!`,
`What’s a turtle’s favorite game?
Beakaboo.`,
`Why do Teenage Mutant Ninja Turtles hate office work?
Because they can’t stand The Shredder.`,
`What’s green and goes click, click, click?
A ballpoint turtle.`,
`What’s a turtle’s go-to romantic move?
Slow dances.`,
`What did the turtle say to the taco?
“My shell or yours?”`,
`How did the musician turtle get off his back?
He rocked, and he rolled.`,
`What type of turtles are easiest to spot?
Green “see” turtles.`,
`What do you need to do to buy a rare turtle?
You have to shell out a ton of money.`,
`What do you call a turtle with diarrhea?
A turdle.`,
`What do you get when you cross a pig and a tortoise?
A slow-pork.`,
`If a turtle loses its shell,
Is it naked or homeless?`
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export let BobCommands : ICommand[] = [
    {
        triggerwords:["tell","a","joke","bob"],
        async cmd(msg:Discord.Message) {
            await msg.channel.sendTyping();
            await sleep(1800);
            await msg.reply(jokes[Math.floor(Math.random()*jokes.length)])
            if(Math.random()<.9)
            { 
                let tch = await clientBee.channels.fetch(msg.channel.id) as Discord.TextChannel;
                await tch.sendTyping();
                await sleep(3000);
                let beesmsg = await tch.send("Stop telling such terrible jokes (╬ ಠ益ಠ)")
                await msg.channel.sendTyping();
                await sleep(3000);
                let bobMsg = await msg.channel.send({
                    content:"make me stop ┌( ಠ_ಠ)┘",
                    reply: { messageReference:beesmsg }
                })
                
                await sleep(3000);
                beesmsg = await tch.send({
                    files:["https://cdn.discordapp.com/attachments/746327136104611850/898262174055694336/unknown.png"],
                    reply:{ messageReference:bobMsg }
                })
            }
        }
    }
];