import { RPGData } from "../RPG/rpg";
import * as Discord from 'discord.js';
export declare type Actions = ("hugs" | "cuddles" | "noms" | "goodbees" | "pats");
export declare var userkey: string;
export declare class Userdata {
    id: string;
    tag: string;
    msgs: number;
    color: number;
    accentcolor: number;
    hexcolor: string;
    hexaccentcolor: string;
    fetchCounter: number;
    extra: any;
    rpg: RPGData;
    constructor();
    test(): void;
    getSent(type: Actions): Promise<number>;
    getReceived(type: Actions): Promise<number>;
    save(): Promise<void>;
}
export declare function getUser(userid: string, msg?: Discord.Message): Promise<Userdata>;
export declare function setUserByID(userid: string, userdata: Userdata): Promise<any>;
export declare function setUser(user: Discord.GuildMember, userdata: Userdata): Promise<any>;
export declare function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean): Promise<void>;
