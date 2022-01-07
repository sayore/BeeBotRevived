import { ItemStack } from 'supernode/Game/ItemStack';
import { Vector2 } from 'supernode/Math/Vector2';
export declare class RPGData {
    money: number;
    position: {
        x: number;
        y: number;
    };
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
    extra: any;
    inventory: ItemStack[];
    skillpoints: number;
    level: number;
    harshness: number;
    /**
     * Exp that is used to check if next level is reached.
     * Never access rpg directly! Read-only
     * Access with expToNextLevel()
     */
    currentexp: number;
}
export declare class RPG {
    static getPosition(rpg: RPGData): Vector2;
    /**
     *
     * @returns
     */
    static expToNextLevel(rpg: RPGData): number;
    /**
     * All Exp ever received.
     */
    static allExp(rpg: RPGData): number;
    /**
     *
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    static nextLevelExpRequired(rpg: RPGData): number;
    static _getExpNeeded(rpg: RPGData, level: number): number;
    static getExpNeeded(rpg: RPGData): number;
    static addExp(rpg: RPGData, amount: number): RPGData;
}
