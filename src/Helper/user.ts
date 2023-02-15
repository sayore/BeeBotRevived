import { RPG,RPGData } from "../RPG/rpg";
import { clientBee, db } from '../app';
import _ from "lodash";
import * as Discord from 'discord.js';
import { Vector2 } from "supernode/Math/Vector2";
import { LogLevel, Logging } from 'supernode/Base/Logging';

export type Actions = ("hug" | "cuddle" | "nom" | "goodbee" | "pats");
export var userkey = "userj";

export class Userdata {
    id: string;
    tag: string;
    msgs: number = 0;
    color:number;
    accentcolor:number;
    hexcolor:string;
    hexaccentcolor:string;
    marriedTo:string[]=[];
    fetchCounter=0;
    extra:any;
    rpg: RPGData = new RPGData();
    constructor() {

    }
    
    //Get visible Name of user
    get name() {
        return clientBee.users.cache.get(this.id)?.username;
    }

    marry(userid:string){
        if(!this.marriedTo)
        {this.marriedTo=[];}
        this.marriedTo.push(userid);
    }

    async getSent(type:Actions) : Promise<number>{
        return this.extra?.reactionsStats?.send[type] ?? 0;
    }
    async getReceived(type:Actions) : Promise<number> {
        return this.extra?.reactionsStats?.received[type] ?? 0;
    }
    async save() {
        await Userdata.setUserByID(this.id,this);
        console.log(this);
    }

    static async getUser(userid: string, msg?:Discord.Message): Promise<Userdata> {
        var key = userkey + userid;
        if (await db.exists(key)) {
            let userdata =new Userdata()
            let rpgdata =new RPGData()
            userdata.tag = "No display name";
            userdata.color = 0;
            userdata.hexcolor = "#000000";
            userdata.extra={};
            _.assignIn(userdata,await (JSON.parse(await db.get(key))));
            _.assignIn(rpgdata, userdata.rpg);
            
            try {
                var user = msg.member;
                userdata.fetchCounter++;
                userdata.tag = user.displayName;
                userdata.color = user.displayColor;
                userdata.hexcolor = user.displayHexColor;
                await user.user.fetch();
                userdata.accentcolor = user.user.accentColor; 
                userdata.hexaccentcolor = user.user.hexAccentColor;
            } catch (e) {
                console.log("Could not fetch user.")//\nWe got: ", userdata)
            }
    
            return userdata;
        } else {
            console.log("New User")
            var userdata = new Userdata();
            userdata.id = userid;
    
            return userdata;
        }
    }
    static async getUserById(userid: string): Promise<Userdata> {
        var key = userkey + userid;
        if (await db.exists(key)) {
            let userdata =new Userdata()
            _.assignIn(userdata,await (JSON.parse(await db.get(key))));
    
            return userdata;
        } else {
            console.log("New User")
            var userdata = new Userdata();
            userdata.id = userid;
    
            return userdata;
        }
    }
    static async setUserByID(userid: string, userdata: Userdata) {
        if(!!(userid ?? userdata.id)) { // Wenn beides nicht gesetzt ist SOFORT returnen, wir wollen keine null id's
            console.log("User ID not declared while saving user data. Aborting save. (setUserByID)")
            return;
        }
        console.log("saved" + " user" + (userid ?? userdata.id)+ JSON.stringify(userdata)); 
        return await db.put(userkey + (userid ?? userdata.id), JSON.stringify(userdata));
    }
    static async setUser(user: Discord.GuildMember, userdata: Userdata) {
        if(!userdata.id) {
            return await db.del(userkey + (user.id ?? userdata.id));
        }
    
        Logging.log("Saved: "+ (user.id ?? userdata.id), "User");
        if(!!(user.id ?? userdata.id)) { // Wenn beides nicht gesetzt ist SOFORT returnen, wir wollen keine null id's
            console.log("User ID not declared while saving user data. Aborting save. (setUser)")
            return;
        }
        return await db.put(userkey + (user.id ?? userdata.id), JSON.stringify(userdata));
    }
    
    static async getAllUsers() : Promise<Userdata[]> {
        return (await db.iterateFilter((v,k) => { return _.startsWith(k,"userj") && !(v as Userdata).extra?.left; })).map(v=>JSON.parse(v)).sort();
    }
}