"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPG = void 0;
class RPG {
    constructor() {
        this.money = 50;
        this.str = 5;
        this.agi = 5;
        this.vit = 5;
        this.int = 5;
        this.dex = 5;
        this.luk = 5;
        this.harshness = 0;
        /**
         * Exp that is used to check if next level is reached.
         * Never access this directly! Read-only
         * Access with expToNextLevel()
         */
        this.currentexp = 0;
        this.skillpoints = 0;
        this.level = 1;
        this.inventory = [];
    }
    /**
     *
     * @returns
     */
    expToNextLevel() { return this.currentexp; }
    /**
     * All Exp ever received.
     */
    allExp() {
        return (this.level != 1 ? this.getExpNeeded(this.level - 1) : 0) + this.currentexp;
    }
    ;
    /**
     *
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    nextLevelExpRequired() {
        return Math.pow(this.level, 3) + Math.pow(this.level, 2) * 23 + 100 * this.level + 100;
    }
    getExpNeeded(level) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    addExp(amount) {
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
}
exports.RPG = RPG;
//# sourceMappingURL=rpg.js.map