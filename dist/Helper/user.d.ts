import { RPG } from "../RPG/rpg";
import * as Discord from 'discord.js';
export declare class Userdata {
    id: string;
    tag: string;
    msgs: number;
    color: number;
    accentcolor: number;
    hexcolor: string;
    hexaccentcolor: string;
    rpg: RPG;
    constructor();
    test(): void;
}
export declare function getUser(userid: string, msg?: Discord.Message): Promise<Userdata>;
export declare function setUser(user: Discord.GuildMember, userdata: Userdata): Promise<any>;
export declare function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean): Promise<void>;
