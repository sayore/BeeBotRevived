import { RPG } from "../RPG/rpg";
import { clientBee, db } from '../app';
import _ from "lodash";
import * as Discord from 'discord.js';

export type Actions = ("hugs" | "cuddles" | "noms" | "goodbees" | "pats");

export class Userdata {
    id: string;
    tag: string;
    msgs: number = 0;
    color:number;
    accentcolor:number;
    hexcolor:string;
    hexaccentcolor:string;
    fetchCounter=0;
    rpg: RPG = new RPG();
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

}

export async function getUser(userid: string, msg?:Discord.Message): Promise<Userdata> {
    var key = "user" + userid;
    if (await db.exists(key)) {
        let userdata = <Userdata>_.assignIn(new Userdata(),await (db.get(key)));
        userdata.rpg = <RPG>_.assignIn(new RPG(), userdata.rpg);
        
        userdata.id = userid;
        
        return userdata;
    } else {
        console.log("New User")
        return new Userdata();
    }
}
export async function setUser(user: Discord.GuildMember, userdata: Userdata) {
    if(!userdata.id) {
        return await db.del("user" + user.id);
    }
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
    //console.log(user);
    return await db.put("user" + user.id, userdata);
}

export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}