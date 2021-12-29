import { ItemStack } from 'supernode/Game/ItemStack';
import { Vector2 } from 'supernode/Math/Vector2';

export class RPGData {
    money: number = 50;
    position:{x:number,y:number}={x:0,y:0};
    str: number = 5;
    agi: number = 5;
    vit: number = 5;
    int: number = 5;
    dex: number = 5;
    luk: number = 5;
    extra:any; 
    inventory: ItemStack[] = [];
    skillpoints: number = 0;
    level: number = 1;
    harshness = 0;
    /**
     * Exp that is used to check if next level is reached.
     * Never access rpg directly! Read-only
     * Access with expToNextLevel()
     */
    currentexp: number = 0;
}

export class RPG {
    static getPosition(rpg: RPGData) : Vector2 {
        if(rpg.position)
        return new Vector2(rpg.position.x?rpg.position.x:0,rpg.position.y?rpg.position.y:0);

        return new Vector2(0,0);
    }
    /**
     * 
     * @returns 
     */
    static expToNextLevel(rpg:RPGData) : number {return rpg.currentexp;}
    /**
     * All Exp ever received.
     */
    static allExp(rpg:RPGData) {
        return (rpg.level != 1 ? RPG._getExpNeeded(rpg, rpg.level - 1) : 0) + rpg.currentexp;
    };
    
    /**
     * 
     * @param level Levelupcosts that are to be calculated
     * @returns Exp needed to the next level
     */
    static nextLevelExpRequired(rpg:RPGData) {
        return Math.pow(rpg.level, 3) + Math.pow(rpg.level, 2) * 23 + 100 * rpg.level + 100;
    }
    static  _getExpNeeded(rpg:RPGData,level: number) {
        return Math.pow(level, 3) + Math.pow(level, 2) * 23 + 100 * level + 100;
    }
    static getExpNeeded(rpg:RPGData) {
        return RPG._getExpNeeded(rpg,rpg.level);
    }
    static addExp(rpg:RPGData,amount: number) {
        rpg.currentexp += amount;
        /**
         * While we have more EXP in our CurrentXP, add level, increase skillpoints, and repeat.
         */
        while (rpg.currentexp >= RPG.nextLevelExpRequired(rpg)) {
            console.log("LEVELUP BEF EXP "+rpg.currentexp)
            console.log("NEEDED "+RPG.nextLevelExpRequired(rpg))
            rpg.currentexp -= RPG.nextLevelExpRequired(rpg);
            console.log("AFTERREM "+rpg.currentexp)
            rpg.skillpoints += 5 + Math.floor(rpg.level / 10);
            rpg.level += 1;
        }
        /**
         * Add the rest of the remaining EXP.
         */
        //rpg.currentexp += amount;
    }
}