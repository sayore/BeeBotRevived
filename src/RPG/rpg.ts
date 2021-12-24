import { ItemStack } from "supernode/Game/ItemStack";

export class RPG {
    money: number = 50;
    str: number = 5;
    agi: number = 5;
    vit: number = 5;
    int: number = 5;
    dex: number = 5;
    luk: number = 5;
    harshness = 0;
    /**
     * Exp that is used to check if next level is reached.
     * Never access this directly! Read-only
     * Access with expToNextLevel()
     */
    private currentexp: number = 0;
    /**
     * 
     * @returns 
     */
    expToNextLevel() : number {return this.currentexp;}
    /**
     * All Exp ever received.
     */
    allExp() {
        return (this.level != 1 ? this.getExpNeeded(this.level - 1) : 0) + this.currentexp;
    };
    skillpoints: number = 0;
    level: number = 1;
    /**
     * 
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    private nextLevelExpRequired() {
        return Math.pow(this.level, 3) + Math.pow(this.level, 2) * 23 + 100 * this.level + 100;
    }
    private getExpNeeded(level: number) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    addExp(amount: number) {
        this.currentexp += amount;
        /**
         * While we have more EXP in our CurrentXP, add level, increase skillpoints, and repeat.
         */
        while (this.currentexp >= this.nextLevelExpRequired()) {
            this.currentexp -= this.nextLevelExpRequired();
            this.skillpoints += 5 + Math.floor(this.level / 10);
            this.level += 1;
        }
        /**
         * Add the rest of the remaining EXP.
         */
        this.currentexp += amount;
    }
    inventory: ItemStack[] = [];
}