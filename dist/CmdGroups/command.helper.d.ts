import * as Discord from 'discord.js';
import { ICommand } from "./icommands";
import { Userdata } from '../Helper/user';
export declare class ResultReport {
    executed: boolean;
    halting: boolean;
    scanned?: number;
    executedNum?: number;
    private start;
    private noConsoleLog;
    constructor(executed: boolean, halting?: boolean, scanned?: number, executedNum?: number);
    add(resrep: ResultReport): this;
    setNoConsoleLog(): this;
    report(): void;
}
export declare function SimplePerRules(cmds: ICommand[], msg: Discord.Message, reports?: ResultReport): ResultReport;
export declare function CheckForManyWords(message: string, words: string[]): boolean;
export declare function CheckForManyWordsCI(message: string, words: string[]): boolean;
export declare function getRandom<T>(arr: T[]): T;
export declare function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean): Promise<void>;
