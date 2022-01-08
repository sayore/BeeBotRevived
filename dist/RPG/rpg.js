"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPG = exports.RPGData = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Vector2_1 = require("supernode/Math/Vector2");
const monster_1 = require("./monster");
class RPGData {
    constructor() {
        this.money = 50;
        this.position = { x: 0, y: 0 };
        this.str = 5;
        this.agi = 5;
        this.vit = 5;
        this.int = 5;
        this.dex = 5;
        this.luk = 5;
        this.inventory = [];
        this.skillpoints = 0;
        this.level = 1;
        this.harshness = 0;
        /**
         * Exp that is used to check if next level is reached.
         * Never access rpg directly! Read-only
         * Access with expToNextLevel()
         */
        this.currentexp = 0;
    }
}
exports.RPGData = RPGData;
class RPG {
    static getPosition(rpg) {
        if (rpg.position)
            return new Vector2_1.Vector2(rpg.position.x ? rpg.position.x : 0, rpg.position.y ? rpg.position.y : 0);
        return new Vector2_1.Vector2(0, 0);
    }
    /**
     *
     * @returns
     */
    static expToNextLevel(rpg) { return rpg.currentexp; }
    /**
     * All Exp ever received.
     */
    static allExp(rpg) {
        return (rpg.level != 1 ? RPG._getExpNeeded(rpg, rpg.level - 1) : 0) + rpg.currentexp;
    }
    ;
    /**
     *
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    static nextLevelExpRequired(rpg) {
        return Math.pow(rpg.level, 3) + Math.pow(rpg.level, 2) * 23 + 100 * rpg.level + 100;
    }
    static _getExpNeeded(rpg, level) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    static getExpNeeded(rpg) {
        return RPG._getExpNeeded(rpg, rpg.level);
    }
    static addExp(rpg, amount) {
        rpg.currentexp += amount;
        /**
         * While we have more EXP in our CurrentXP, add level, increase skillpoints, and repeat.
         */
        while (rpg.currentexp >= RPG.nextLevelExpRequired(rpg)) {
            console.log("LEVELUP BEF EXP " + rpg.currentexp);
            console.log("NEEDED " + RPG.nextLevelExpRequired(rpg));
            rpg.currentexp -= RPG.nextLevelExpRequired(rpg);
            console.log("AFTERREM " + rpg.currentexp);
            rpg.skillpoints += 5 + Math.floor(rpg.level / 10);
            rpg.level += 1;
        }
        /**
         * Add the rest of the remaining EXP.
         */
        //rpg.currentexp += amount;
        return rpg;
    }
    static getPositionPlace(vec) {
        let tarLoc = lodash_1.default.clone(monster_1.Places.find(p => {
            return p.mapPos.asString() == vec.asString();
        }));
        return tarLoc;
    }
}
exports.RPG = RPG;
//# sourceMappingURL=rpg.js.map