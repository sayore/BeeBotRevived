import * as Discord from 'discord.js';
import { ICommand } from "./icommands";
export declare function SimplePerRules(cmds: ICommand[], msg: Discord.Message): boolean;
export declare function CheckForManyWords(message: string, words: string[]): boolean;
export declare function CheckForManyWordsCI(message: string, words: string[]): boolean;
export declare function getRandom<T>(arr: T[]): T;
