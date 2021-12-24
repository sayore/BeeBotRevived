import { RPG } from "../RPG/rpg";
export declare class Userdata {
    id: string;
    tag: string;
    msgs: number;
    rpg: RPG;
    constructor();
    test(): void;
}
export declare function getUser(userid: string): Promise<Userdata>;
export declare function setUser(userid: string, userdata: Userdata): Promise<any>;
export declare function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean): Promise<void>;
