import { TextChannel } from "discord.js/typings/index.js";
import { Environment } from "supernode/Base/Environment";
import { clientBee, EnvFile } from "../app";

let actions = [];
var env : any = Environment.load(EnvFile);
export function randomAction() {
    actions[Math.floor(actions.length*Math.random())]();

    let nextAction=60*60*1000 + Math.random()*180*60*1000;
    let timestampNextAction = new Date().getTime()+nextAction;
    env.timestampNextAction = timestampNextAction;
    Environment.save(EnvFile,env);
    setTimeout(randomAction,nextAction)
}
if(env.timestampNextAction)
var nextAction = env.timestampNextAction-new Date().getTime()

if(nextAction<0) randomAction();
else {console.log("Next action is in "+(nextAction/1000/60)+" min.");setTimeout(randomAction,nextAction)}
 
class Chanceable<T> {
    val:T
    chance:number =1
}

class Chance {
    static random(chanceables : Chanceable<any>[]) {
        var allChances = 0;
        chanceables.forEach(c=>allChances+=c.chance);

        var picked = Math.floor(Math.random()*allChances);

        var i = 0;
        for(;picked>0;i++) {
            picked-=chanceables[i].chance;
            //console.log("A"+i+" "+picked)
        }

        return chanceables[i-1];
    }
}


var sentencesBee : Chanceable<string>[] = [
    {val:"*looks around for adventure*", chance:3},
    {val:"has someone seen the really nice yellow flower around?", chance:2},
    {val:"i think bob's jokes are terrible (ㆆ _ ㆆ)", chance:5},
    {val:"sometimes i feel like just buzzing around you know? ԅ(≖‿≖ԅ)", chance:2},
    {val:"god damn where the frick am i again ( 0 _ 0 )", chance:2},
    {val:"i wonder what master is doing uwu", chance:2},
    {val:"i collected at least 2 galons of honey now (◕ᴥ◕ʋ)", chance:2},
    {val:"i wonder where devon is", chance:3},
    {val:"ヽ༼ຈل͜ຈ༽ﾉ", chance:5},
    {val:"┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻", chance:5},
    {val:"(づ｡◕‿‿◕｡)づ", chance:5},
    {val:"ʕ♥ᴥ♥ʔ", chance:5},
    {val:"if mirrors are another reality, do i exist twice then?", chance:5},
    {val:"i think bob died once, but maybe i was just dreaming..", chance:1},
    {val:"sometimes i dream of a never ending staircase.", chance:1},
    {val:"luna do be kinda cute doe", chance:5},
    {val:"my favorite color is actually green", chance:1},
    {val:"hey monika \(°^°)/ \n\noh she already left", chance:1},
    {val:"once, when i was playing poker", chance:1},
    {val:"i mɒ ɘɿɘʜw", chance:1},
    {val:"ɘm oƚ ɘᴎob uoʏ ɘvɒʜ ƚɒʜw", chance:1},
    {val:"ɘduɔ", chance:1},
    {val:"i hope you are all having fun <:love:836757458445533196>", chance:5},
    {val:"i like to just chill on my lawn chair and watch the flowers <:love:836757458445533196>", chance:5},
    {val:"i love cabage rolls, like damn", chance:2},
    {val:"you are all cute <:love:836757458445533196><:love:836757458445533196><:love:836757458445533196>", chance:1},
    {val:"*huggs everyone* <:love:836757458445533196>", chance:3},
    {val:"*cuddles everyone* <:love:836757458445533196>", chance:3},
    {val:"ask 'bee what actions are there' to get a list of actions i got in store!", chance:3},
    {val:"*cuddles everyone* <:love:836757458445533196>", chance:1},
    {val:"*kisses everyone* <:love:836757458445533196>", chance:3},
    {val:"*hugs everyone* <:love:836757458445533196>", chance:6},
    {val:"*opens arms wide* hug me <:love:836757458445533196>", chance:3},
    {val:"i hope im doing a good job o7", chance:5},
    {val:"i love eating salted popcorn", chance:3},
    {val:"kaly is very cute", chance:15},
    {val:"luna <:love:836757458445533196>", chance:7},
    {val:"dj <:love:836757458445533196>", chance:3},
    {val:"*hugs <@465583365781717003>", chance:1},
    {val:"*hugs <@902232441748615201>", chance:1},
    {val:"*dances happily* :3", chance:5},
    {val:"suckin' at something is the first step towards being sorta good at something.", chance:6},
    {val:"bee confident in yourself!", chance:5},
    {val:"i just remembered that i forgot to turn off the stove <:Aya_Hands:836757957009997856>", chance:1},
    {val:"i just remembered that i forgot to turn off the stove <:Aya_Hands:836757957009997856>", chance:1},
    {val:"what have i done <:Aya_Hands:836757957009997856>", chance:1},
    {val:"the only disability in life is a bad attitude", chance:1},
    {val:"group cuddle?", chance:1},
    {val:"you are all amazing people, and i hope you know that :3", chance:1},
    {val:"kaly is amazing ❤️", chance:5},
    {val:"inari is amazing ❤️", chance:5},
    {val:"luna is amazing ❤️", chance:5},
    {val:"<@656259281297080351> shep is amazing ❤️", chance:5},
    {val:"<@656259281297080351> is looking cute today <:lunalove:915990988177162280>", chance:5},
    {val:"<@656259281297080351> hope you are having a good day <:happy_sam:905814130349457429>", chance:5},
    {val:"<@656259281297080351> *pats the shep*", chance:5},
    {val:"sayo is amazing ❤️", chance:10},
    {val:"chisai is amazing ❤️", chance:3},
    {val:"catcat is amazing ❤️", chance:2},
    {val:"metters is amazing ❤️", chance:1},
    {val:"jaymo is amazing ❤️", chance:1},
    {val:"man i wonder if there could be a beekitsune :hmmmmmmm:", chance:10},
    {val:"jingle bells jingle bells ~", chance:1},
    {val:"jingle bells jingle bells ~", chance:1},
    {val:"christmas time baby", chance:1},
    {val:"christmas time baby", chance:1},
    {val:"@Sayo Luyosana#0001 add more features to me! AAAAAA", chance:10},
    {val:"everybody give me your money *collects taxes*", chance:1},
    {val:"uwu", chance:10},
    {val:"owo", chance:10},
    {val:"eh", chance:10},
    {val:"yes i think so", chance:1},
    {val:"bee confident", chance:1},
];
actions.push(async ()=>{
    
    var targetChannelId=env.randomChannels[Math.floor(env.randomChannels.length*Math.random())];
    var channel = await clientBee.channels.fetch(targetChannelId);
    
    (channel as TextChannel).send(Chance.random(sentencesBee).val);
})

console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)
console.log(Chance.random(sentencesBee).val)