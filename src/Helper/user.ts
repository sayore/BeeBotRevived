import { RPG,RPGData } from "../RPG/rpg";
import { clientBee, db } from '../app';
import _ from "lodash";
import * as Discord from 'discord.js';
import { Vector2 } from "supernode/Math/Vector2";

export type Actions = ("hugs" | "cuddles" | "noms" | "goodbees" | "pats");
export var userkey = "userj";

export class Userdata {
    id: string;
    tag: string;
    msgs: number = 0;
    color:number;
    accentcolor:number;
    hexcolor:string;
    hexaccentcolor:string;
    fetchCounter=0;
    extra:any;
    rpg: RPGData = new RPGData();
    constructor() {

    }
    test(){
        
    }

    async getSent(type:Actions) : Promise<number>{
        var key="action::"+type+"Sent::"+this.id
        let ret = 0;
        if(await db.exists(key))
        {ret = await db.get(key) as number;}

        return (ret?ret:0);
    }
    async getReceived(type:Actions) : Promise<number> {
        var key="action::"+type+"Received::"+this.id
        let ret = 0;
        if(await db.exists(key))
        {ret = await db.get(key) as number;}

        return (ret?ret:0);
    }
    async save() {
        await setUserByID(this.id,this);
        console.log(this);
    }
}

export async function getUser(userid: string, msg?:Discord.Message): Promise<Userdata> {
    var key = userkey + userid;
    if (await db.exists(key)) {
        let userdata =new Userdata()
        _.assignIn(userdata,await (JSON.parse(await db.get(key))));
        /*userdata.rpg = <RPG>_.assignIn(new RPG(), userdata.rpg);
        userdata.rpg.position = new Vector2(userdata.rpg.position.x,userdata.rpg.position.y);
        userdata.id = userid;*/
        var user = msg.member;
        userdata.fetchCounter++;
        userdata.tag = user.displayName;
        userdata.color = user.displayColor;
        userdata.hexcolor = user.displayHexColor;
        try {
            await user.user.fetch();
            userdata.accentcolor = user.user.accentColor; 
            userdata.hexaccentcolor = user.user.hexAccentColor;
        } catch (e) {
            console.log("Could not fetch user.\nWe got: ", userdata)
        }

        return userdata;
    } else {
        console.log("New User")
        var userdata = new Userdata();
        userdata.id = userid;

        return userdata;
    }
}
export async function setUserByID(userid: string, userdata: Userdata) {
    console.log("saved" + " user" + userid+ JSON.stringify(userdata)); 
    return await db.put(userkey + userid, JSON.stringify(userdata));
}
export async function setUser(user: Discord.GuildMember, userdata: Userdata) {
    if(!userdata.id) {
        return await db.del(userkey + user.id);
    }

    //console.log(user);
    return await db.put(userkey + user.id, JSON.stringify(userdata));
}

export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}