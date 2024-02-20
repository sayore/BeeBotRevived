import { RPG,RPGData } from "../RPG/BaseRPG";
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
    votebanned:boolean = false;
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

    // Force marry to user, two sided
    async marry(targetid:string){
        // Get the user
        var target = await Userdata.getUserById(targetid);
        //check if already married
        if(!target.marriedTo.includes(targetid))
        target.marriedTo.push(this.id);
        target.save();

        if(!this.marriedTo)
        {this.marriedTo=[];}

        if(!this.marriedTo.includes(targetid))
        this.marriedTo.push(targetid);

        return this;
    }

    adopt(userid:string){
        
    }


    // Get the amount of sent reactions of a type
    async getSent(type:Actions|string) : Promise<number>{
        return Number(_.get(this,"extra.reactionsStats.send."+type,0));
    }
    // Get the amount of received reactions of a type
    async getReceived(type:Actions|string) : Promise<number> {
        return Number(_.get(this,"extra.reactionsStats.received."+type,0))
    }
    // Set the amount of sent reactions of a type
    async setSent(type:Actions|string,amount:number) {
        _.set(this,"extra.reactionsStats.send",amount)

        return this;
    }
    // Set the amount of received reactions of a type
    async setReceived(type:Actions|string,amount:number) {
        _.set(this,"extra.reactionsStats.received",amount)

        return this;
    }

    // Add a sent reaction of a type
    async addSent(type:Actions|string,amount:number) {
        _.set(this,"extra.reactionsStats.send."+type,Number(_.get(this,"extra.reactionsStats.send."+type,0))+amount)
        
        return this;
    }
    // Add a received reaction of a type
    async addReceived(type:Actions|string,amount:number) {
        _.set(this,"extra.reactionsStats.received."+type,Number(_.get(this,"extra.reactionsStats.received."+type,0))+amount)

        return this;
    }

    async save() {
        await Userdata.setUserByID(this.id,this);
        //console.log(this);
    }

    async getDiscordUser() {
        return await clientBee.users.fetch(this.id);
    }

    static async getUser(user: string|Discord.User, msg?:Discord.Message): Promise<Userdata> {
        if(!user) return undefined;
        var userid:string;
        if(typeof(user)=="string") userid = user;
        if(typeof(user)!="string") userid = user.id;

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
            
            if(!!msg) {
                try {
                    let user = msg.member;
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
        if(!(!!userid ? userid : userdata.id)) { // Wenn beides nicht gesetzt ist SOFORT returnen, wir wollen keine null id's
            console.log("User ID not declared while saving user data. Aborting save. (setUserByID)")
            return;
        }
        //Logging.log("saved" + " user" + (!!userid ? userid : userdata.id), LogLevel.Report); 
        return await db.put(userkey + (!!userid ? userid : userdata.id), JSON.stringify(userdata));
    }
    static async setUser(user: Discord.GuildMember, userdata: Userdata) {
        if(!userdata.id) {
            return await db.del(userkey + (!!user?.id ? user.id : userdata.id));
        }
    
        //Logging.log("Saved: "+ (!!user?.id ? user.id : userdata.id), "User");
        if(!(!!user?.id ? user.id : userdata.id)) { // Wenn beides nicht gesetzt ist SOFORT returnen, wir wollen keine null id's
            console.log("User ID not declared while saving user data. Aborting save. (setUser "+user.id+" | "+userdata.id+")")
            return;
        }
        return await db.put(userkey + (!!user?.id ? user?.id : userdata.id), JSON.stringify(userdata));
    }
    
    static async getAllUsers() : Promise<Userdata[]> {
        return (await db.iterateFilter((v,k) => { return _.startsWith(k,"userj") && !(v as Userdata).extra?.left; })).map(v=>JSON.parse(v)).sort();
    }
}