import _ from 'lodash';
import { ItemStack } from 'supernode/Game/ItemStack';
import { Vector2 } from 'supernode/Math/Vector2';
import { IPlace, Places } from './BaseMonster';

export class RPGData {
    money: number = 50;
    position:{x:number,y:number}={x:0,y:0};
    str: number = 5;
    agi: number = 5;
    vit: number = 5;
    int: number = 5;
    dex: number = 5;
    luk: number = 5;
    damage: number = 0;
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
    alive: boolean = true;
}

export class RPG {
    //TODO: Add a way to get the exp needed for the next level.
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
    
    static getMaxHealth(rpg:RPGData) {
        return Math.floor(100 + (rpg.vit * 4 * (rpg.level*0.133)) + rpg.level * 2 + rpg.dex * 0.66);
    }

    static getMaxMana(rpg:RPGData) {
        return Math.floor(100 + (rpg.int * 2 * (rpg.level*0.133)) + rpg.level * 3 + rpg.dex * 0.66);
    }

    static getAttack(rpg:RPGData) {
        return Math.floor(2 + (rpg.str * 3 * (rpg.level*0.133)) + rpg.level * 0.33 + rpg.dex * 0.1);
    }

    static getDefense(rpg:RPGData) {
        return Math.floor(2 + (rpg.vit * 3 * (rpg.level*0.133)) + rpg.level * 0.33 + rpg.dex * 0.1);
    }

    static getIsAlive(rpg:RPGData) {
        return (rpg.damage - RPG.getMaxHealth(rpg)) < 0;
    }

    static getMagicAttack(rpg:RPGData) {
        return Math.floor(2 + (rpg.int * 1.5 * (rpg.level*0.133)) + rpg.level * 2 + rpg.dex * 2);
    }

    static getMagicDefense(rpg:RPGData) {
        return Math.floor(2 + (rpg.int * 1.5 * (rpg.level*0.133)) + rpg.level * 2 + rpg.dex * 2);
    }

    static getSpeed(rpg:RPGData) {
        return Math.floor(2 + (rpg.agi * 1.5 * (rpg.level*0.133)) + rpg.level * 2 + rpg.dex * 2);
    }

    static getLuck(rpg:RPGData) {
        return 2 + (rpg.luk * 1.2 * (rpg.level*0.133)) + rpg.level * 2 + rpg.dex * 2;
    }

    static attack(attacker:RPGData, target: RPGData) {
        if(attacker.alive == false || target.alive == false) return 0;
        let attack = (RPG.getAttack(attacker) * 1.33 - RPG.getDefense(target) / 1.5) ;
        
        //Calculate if critical hit
        let critChance = 0.05 + (RPG.getLuck(attacker) / 1000) - (RPG.getLuck(target) / 2000);
        let isCrit = Math.random() < critChance;

        if (isCrit) {
            console.log("CRITICAL HIT")
            attack *= 2 + 0.5 * (RPG.getLuck(attacker) / 1000) - (RPG.getLuck(target) / 2000);
        }

        //Calculate if miss
        
        let finalDamage = Math.floor(attack * ((0.3 + Math.random()*0.2) + 0.5*(Math.random()*(attacker.dex / 1000) - (attacker.dex / 3000))));
        //Check if damage leads to negative health, if so set it to 0, if not set it to the damage maximally possible
        if (target.damage + finalDamage > RPG.getMaxHealth(target)) {
            finalDamage = RPG.getMaxHealth(target);
        } 
        
        let missChance = 0.02 + (RPG.getSpeed(target) / 1000) - (RPG.getSpeed(attacker) / 2000);
        //if miss, set damage to 0
        if (Math.random() < missChance) {
            finalDamage = 0;
        }

        return finalDamage;
    }

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
        return rpg;
    }
    static getPositionPlace(vec:Vector2) : IPlace {
        let tarLoc = _.clone(Places.find(p => {
            return p.mapPos.asString() == vec.asString()
        }));
        return tarLoc;
    }
}