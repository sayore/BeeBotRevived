import { ItemStack } from "supernode/Game/ItemStack";
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
