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
const Environment_1 = require("supernode/Base/Environment");
const app_1 = require("../app");
let actions = [];
function randomAction() {
    actions[Math.floor(actions.length * Math.random())]();
    setTimeout(randomAction, 60 * 60 * 1000 + Math.random() * 180 * 60 * 1000);
}
setTimeout(randomAction, 10000);
actions.push(() => __awaiter(void 0, void 0, void 0, function* () {
    var env = Environment_1.Environment.load(app_1.EnvFile);
    var targetChannelId = env.randomChannels[Math.floor(env.randomChannels.length * Math.random())];
    var channel = yield app_1.clientBee.channels.fetch(targetChannelId);
    var sentencesBee = [
        "*looks around for adventure*",
        "*looks around for adventure*",
        "*looks around for adventure*",
        "has someone seen the really nice " + (["blue", "red", "green", "yellow"][Math.floor(Math.random() * 4)]) + " flower around?",
        "has someone seen the really nice " + (["blue", "red", "green", "yellow"][Math.floor(Math.random() * 4)]) + " flower around?",
        "i think bob's jokes are terrible (ㆆ _ ㆆ)",
        "i think bob's jokes are terrible (ㆆ _ ㆆ)",
        "sometimes i feel like just buzzing around you know? ԅ(≖‿≖ԅ)",
        "sometimes i feel like just buzzing around you know? ԅ(≖‿≖ԅ)",
        "god damn where the frick am i again ( 0 _ 0 )",
        "god damn where the frick am i again ( 0 _ 0 )",
        "i wonder what master is doing uwu",
        "i wonder what master is doing uwu",
        "i collected at least 2 galons of honey now (◕ᴥ◕ʋ)",
        "i collected at least 2 galons of honey now (◕ᴥ◕ʋ)",
        "i wonder where devon is",
        "ヽ༼ຈل͜ຈ༽ﾉ",
        "┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
        "(づ｡◕‿‿◕｡)づ",
        "ʕ♥ᴥ♥ʔ",
        "if mirrors are another reality, do i exist twice then?",
        "i think bob died once, but maybe i was just dreaming..",
        "sometimes i dream of a never ending staircase.",
        "luna do be kinda cute doe",
        "my favorite color is actually green",
        "hey monika \(°^°)/ \n\noh she already left",
        "once, when i was playing poker",
        "i mɒ ɘɿɘʜw",
        "ɘm oƚ ɘᴎob uoʏ ɘvɒʜ ƚɒʜw",
        "ɘduɔ",
        "i hope you are all having fun <:love:836757458445533196>",
        "i like to just chill on my lawn chair and watch the flowers <:love:836757458445533196>",
        "i love cabage rolls, like damn",
        "you are all cute <:love:836757458445533196><:love:836757458445533196><:love:836757458445533196>",
        "*huggs everyone* <:love:836757458445533196>",
        "*huggs everyone* <:love:836757458445533196>",
        "*huggs everyone* <:love:836757458445533196>",
        "*huggs everyone* <:love:836757458445533196>",
        "*cuddles everyone* <:love:836757458445533196>",
        "*cuddles everyone* <:love:836757458445533196>",
        "*cuddles everyone* <:love:836757458445533196>",
        "*cuddles everyone* <:love:836757458445533196>",
        "ask 'bee what actions are there' to get a list of actions i got in store!",
        "ask 'bee what actions are there' to get a list of actions i got in store!",
        "ask 'bee what actions are there' to get a list of actions i got in store!",
        "*cuddles everyone* <:love:836757458445533196>",
        "*kisses everyone* <:love:836757458445533196>",
        "*kisses everyone* <:love:836757458445533196>",
        "*kisses everyone* <:love:836757458445533196>",
        "*kisses everyone* <:love:836757458445533196>",
        "*hugs everyone* <:love:836757458445533196>",
        "*hugs everyone* <:love:836757458445533196>",
        "*hugs everyone* <:love:836757458445533196>",
        "*hugs everyone* <:love:836757458445533196>",
        "*opens arms wide* hug me <:love:836757458445533196>",
        "*opens arms wide* hug me <:love:836757458445533196>",
        "*opens arms wide* hug me <:love:836757458445533196>",
        "i hope im doing a good job o7",
        "i love eating salted popcorn",
        "kaly is very cute",
        "luna <:love:836757458445533196>",
        "dj <:love:836757458445533196>",
        "*hugs <@465583365781717003>",
        "*hugs <@902232441748615201>",
        "*dances happily* :3",
        "suckin' at something is the first step towards being sorta good at something.",
        "suckin' at something is the first step towards being sorta good at something.",
        "suckin' at something is the first step towards being sorta good at something.",
        "bee confident in yourself!",
        "bee confident in yourself!",
        "i just remembered that i forgot to turn off the stove <:Aya_Hands:836757957009997856>",
        "i just remembered that i forgot to turn off the stove <:Aya_Hands:836757957009997856>",
        "what have i done <:Aya_Hands:836757957009997856>",
        "the only disability in life is a bad attitude",
        "group cuddle?",
        "you are all amazing people, and i hope you know that :3",
        "kaly is amazing ❤️",
        "kaly is amazing ❤️",
        "kaly is amazing ❤️",
        "kaly is amazing ❤️",
        "inari is amazing ❤️",
        "luna is amazing ❤️",
        "luna is amazing ❤️",
        "sayo is amazing ❤️",
        "sayo is amazing ❤️",
        "chisai is amazing ❤️",
        "catcat is amazing ❤️",
        "catcat is amazing ❤️",
        "catcat is amazing ❤️",
        "catcat is amazing ❤️",
        "metters is amazing ❤️",
        "jaymo is amazing ❤️",
        "man i wonder if there could be a beekitsune :hmmmmmmm:",
        "man i wonder if there could be a beekitsune :hmmmmmmm:",
        "man i wonder if there could be a beekitsune :hmmmmmmm:",
        "jingle bells jingle bells ~",
        "jingle bells jingle bells ~",
        "christmas time baby",
        "christmas time baby",
        "@Sayo Luyosana#0001 add more features to me! AAAAAA",
        "everybody give me your money *collects taxes*",
        "uwu",
        "owo",
        "eh",
        "yes i think so",
        "bee confident",
    ];
    channel.send(sentencesBee[Math.floor(sentencesBee.length * Math.random())]);
}));
//# sourceMappingURL=random.js.map