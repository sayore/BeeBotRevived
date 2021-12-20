import * as Discord from 'discord.js';
import { ItemStack } from 'supernode/Game/ItemStack';
import { ICommand } from "./icommands";
export declare class ResultReport {
    executed: boolean;
    halting: boolean;
    scanned?: number;
    executedNum?: number;
    constructor(executed: boolean, halting?: boolean, scanned?: number, executedNum?: number);
    add(resrep: ResultReport): this;
    report(): void;
}
export declare function SimplePerRules(cmds: ICommand[], msg: Discord.Message, reports?: ResultReport): ResultReport;
export declare function CheckForManyWords(message: string, words: string[]): boolean;
export declare function CheckForManyWordsCI(message: string, words: string[]): boolean;
export declare function getRandom<T>(arr: T[]): T;
export declare class RPG {
    money: number;
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
    harshness: number;
    /**
     * Exp that is used to check if next level is reached.
     * Never access this directly! Read-only
     * Access with expToNextLevel()
     */
    private currentexp;
    /**
     *
     * @returns
     */
    expToNextLevel(): number;
    /**
     * All Exp ever received.
     */
    allExp(): number;
    skillpoints: number;
    level: number;
    /**
     *
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    private nextLevelExpRequired;
    private getExpNeeded;
    addExp(amount: number): void;
    inventory: ItemStack[];
}
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
