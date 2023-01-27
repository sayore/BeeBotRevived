import { TextChannel } from "discord.js/typings/index.js";
import { Environment } from "supernode/Base/Environment";
import { Logging, LogLevel } from "supernode/Base/Logging";
import { Chance, Chanceable } from "supernode/Math/mod";
import { clientBee, EnvFile } from "../app";
import { getRandom } from "./command.helper";

export class RandomEvents {
    static actions = [];
    crnttimeout = undefined;
    env: any = Environment.load(EnvFile);
    static sentencesBee: Chanceable<string>[] = []
    constructor() {
        RandomEvents.sentencesBee = [
            { val: "*looks around for adventure*", chance: 3 },
            { val: "has someone seen the really nice yellow flower around?", chance: 2 },
            { val: "i think bob's jokes are terrible (ㆆ _ ㆆ)", chance: 5 },
            { val: "sometimes i feel like just buzzing around you know? ԅ(≖‿≖ԅ)", chance: 2 },
            { val: "god damn where the frick am i again ( 0 _ 0 )", chance: 2 },
            { val: "i collected at least 2 galons of honey now (◕ᴥ◕ʋ)", chance: 2 },
            { val: "ヽ༼ຈل͜ຈ༽ﾉ", chance: 5 },
            { val: "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻", chance: 5 },
            { val: "(づ｡◕‿‿◕｡)づ", chance: 5 },
            { val: "ʕ♥ᴥ♥ʔ", chance: 5 },
            { val: "if mirrors are another reality, do i exist twice then?", chance: 5 },
            { val: "i think bob died once, but maybe i was just dreaming..", chance: 1 },
            { val: "sometimes i dream of a never ending staircase.", chance: 1 },
            { val: "my favorite color is actually green", chance: 1 },
            { val: "hey monika \\(°^°)/ \n\noh she already left", chance: 1 },
            { val: "once, when i was playing poker", chance: 1 },
            { val: "ɘduɔ", chance: 1 },
            { val: "i love cabage rolls, like damn", chance: 2 },
            { val: "ask 'bee what actions are there' to get a list of actions i got in store!", chance: 3 },
            { val: "i hope im doing a good job o7", chance: 5 },
            { val: "i love eating salted popcorn", chance: 3 },
            { val: "*dances happily* :3", chance: 5 },
            { val: "suckin' at something is the first step towards being sorta good at something.", chance: 6 },
            { val: "bee confident in yourself!", chance: 5 },
            { val: "the only disability in life is a bad attitude", chance: 1 },
            { val: "group cuddle?", chance: 1 },
            { val: "you are all amazing people, and i hope you know that :3", chance: 1 },
            { val: "man i wonder if there could be a beekitsune :hmmmmmmm:", chance: 10 },
            { val: "<@562640877705756690> add more features to me! AAAAAA", chance: 10 },
            { val: "everybody give me your money *collects taxes*", chance: 1 },
            { val: "uwu", chance: 10 },
            { val: "owo", chance: 10 },
            { val: "eh", chance: 10 },
            { val: "yes i think so", chance: 1 },
            { val: "bee confident", chance: 1 },
        ];

        //Logging.log(this.env.randomChannels[Math.floor(this.env.randomChannels.length * Math.random())])
        RandomEvents.actions.push(async () => {
            if (this.env.randomChannels) {
                var targetChannelId = this.env.randomChannels[Math.floor(this.env.randomChannels.length * Math.random())];
                var channel = await clientBee.channels.fetch(targetChannelId);

                (channel as TextChannel).send(Chance.random(RandomEvents.sentencesBee).val);
            }
            else {
                Logging.log("There is no channel registred for random message events!", LogLevel.Report)
            }
        })
    }
    randomAction() {
        //Logging.log(this.randomAction) 
        // Execute a random function in the possible "actions" array
        getRandom(RandomEvents.actions)();

        // calculate the next event's moment
        let nextAction = 25 * 60 * 1000 + Math.random() * 900 * 60 * 1000;
        //let nextAction = 0.5 * 60 * 1000 //+ Math.random() * 30 * 60 * 1000;
        // create the timestamp for the next event to save
        let timestampNextAction = new Date().getTime() + nextAction;
        // Save the next random event into the server's config
        this.env = Environment.load(EnvFile)
        this.env.timestampNextAction = timestampNextAction;
        Environment.save(EnvFile, this.env);

        // If there is a timeout already, unset it (in case we wanna trigger a random event manually)
        if (this.crnttimeout != undefined)
            clearTimeout(this.crnttimeout);

        // Set the timeout for the next event.
        this.crnttimeout = setTimeout(() => this.randomAction(), nextAction)

        Logging.log("Next action is in " + (nextAction / 1000 / 60) + " min.");
    }
    started = false;
    start() {
        if (this.started) return;
        this.started = true;

        if (this.env.timestampNextAction)
            var nextAction = this.env.timestampNextAction - new Date().getTime()

        //DEBUG:Immediately trigger the next random Event.
        //nextAction=-99;

        // If timestamp has already passed, execute the random action immeditately.
        if (nextAction < 0)
            this.randomAction();
        else { // If Timeout is not been passed, set the timerout for the next action.
            Logging.log("Next action is in " + (nextAction / 1000 / 60) + " min.");
            this.crnttimeout = setTimeout(this.randomAction, nextAction)
        }
    }
}

