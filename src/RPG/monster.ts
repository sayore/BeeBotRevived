import { Chanceable } from "supernode/Math/Chanceable";
import { Vector2 } from "supernode/Math/Vector2";
import { Chance } from 'supernode/Math/mod';
import { ItemStack } from 'supernode/Game/ItemStack';
import _ from 'lodash';
import { ItemDB } from "supernode/Game/ItemDB";
import { BeeItemDB } from "./itemdb";

class BaseMonster {
    type:"normal"
    private _name:string = "No Name Monster"
    private _elementar:("fire"|"earth"|"wind"|"stone"|"metal"|"light"|"dark"|"void"|"slime")[] = [];
    private _hp:number=1
    private _money: number=1
    private _str: number=5
    private _agi: number=5
    private _vit: number=5
    private _int: number=5
    private _dex: number=5
    private _luk: number=5
    private _loot: Chanceable<ItemStack>[];
    
    public get Name():string {return this._name;}
    public get Elementar():("fire"|"earth"|"wind"|"stone"|"metal"|"light"|"dark"|"void"|"slime")[] { return this._elementar; };
    public get Hp():number {return this._hp};
    public get Money(): number {return this._money;}
    public get Str():number {return this._str;}
    public get Agi():number {return this._agi;}
    public get Vit():number {return this._vit;}
    public get Int():number {return this._int;}
    public get Dex():number {return this._dex;}
    public get Luk():number {return this._luk;}

    public set Name(name:string) {this._name=name;}
    public set Elementar(elements:("fire"|"earth"|"wind"|"stone"|"metal"|"light"|"dark"|"void"|"slime")[]) { this._elementar=elements; };
    public set Hp(value:number) {this._hp=value};
    public set Money(value:number) {this._money=value;}
    public set Str(value:number) {this._str=value;}
    public set Agi(value:number) {this._agi=value;}
    public set Vit(value:number) {this._vit=value;}
    public set Int(value:number) {this._int=value;}
    public set Dex(value:number) {this._dex=value;}
    public set Luk(value:number) {this._luk=value;}

    public setName(name:string):this            {this.Name=name;return this;}
    public setElementar(elements:("fire"|"earth"|"wind"|"stone"|"metal"|"light"|"dark"|"void"|"slime")[]):this       
        {this.Elementar=elements ;return this; };
    public setHp(value:number):this              {this.Hp=value ;return this};
    public setMoney(value:number): this          {this.Money=value ;return this;}
    public setStr(value:number):this {this.Str=value;return this;}
    public setAgi(value:number):this {this.Agi=value;return this;}
    public setVit(value:number):this {this.Vit=value;return this;}
    public setInt(value:number):this {this.Int=value;return this;}
    public setDex(value:number):this {this.Dex=value;return this;}
    public setLuk(value:number):this {this.Luk=value;return this;}
    public addLoot(isc:Chanceable<ItemStack>):this {this._loot.push(isc); return this;}
    public addLoots(iscs:Chanceable<ItemStack>[]):this {this._loot = _.concat(this._loot,iscs); return this;}

    onAttack?()
    onEncounter?()
    onDefeat?()
}

export interface IPlace {
    shortname:string;
    name:string;
    monster:Chanceable<BaseMonster>[];
    foragable?:Chanceable<ItemStack>[];
    canGoTo?:string[]
    mapPos?:Vector2;
}

export let Monster = {
    raco_base: new BaseMonster()
                .setName("Raco")
                .setStr(2),
    slime_base: new BaseMonster()
                .setName("Slime")
                .setStr(2)
                .addLoots([
                   {chance:0.2,val:BeeItemDB.createStackByCanonicalId("cheese",1)} 
                ]),
    moth_base: new BaseMonster()
                .setName("Moth")
                .setStr(4)
                .setInt(9)
}

export const Places:IPlace[] = [
    {
        shortname:"prontera",
        name:"Prontera",
        monster:[],
        foragable:[
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.8},   //1
            {val:BeeItemDB.createStackByCanonicalId("trash",1),chance:0.3},   //2
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.1},   //3
            {val:BeeItemDB.createStackByCanonicalId("trash",1),chance:0.08},   //4
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.05},   //5
            {val:BeeItemDB.createStackByCanonicalId("trash",1),chance:0.06},   //6
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.05},   //7
            {val:BeeItemDB.createStackByCanonicalId("trash",1),chance:0.04},   //8
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.02},   //9
            {val:BeeItemDB.createStackByCanonicalId("trash",1),chance:0.02},   //10
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.01},   //11
            {val:BeeItemDB.createStackByCanonicalId("stone",1),chance:0.003},   //12
            {val:BeeItemDB.createStackByCanonicalId("money1",1),chance:0.02},
            {val:BeeItemDB.createStackByCanonicalId("money1",3),chance:0.01},
        ],
        //npcs:[],
        mapPos:new Vector2(0,0)
    }, {
        shortname:"ptr_fld1",
        name:"Prontera Fields 1",
        monster:[
            {val:Monster.raco_base,chance:3},
            {val:Monster.slime_base,chance:7},
            {val:Monster.moth_base,chance:1}
        ],
        foragable:[
            {val:BeeItemDB.createStackByCanonicalId("wheat",5),chance:0.03},   //1
            {val:BeeItemDB.createStackByCanonicalId("wheat",2),chance:0.02},   //1
            {val:BeeItemDB.createStackByCanonicalId("wheat",1),chance:0.09},   //1
            {val:BeeItemDB.createStackByCanonicalId("wheat",1),chance:0.20},   //1
            {val:BeeItemDB.createStackByCanonicalId("wheat",1),chance:0.08},   //1
            {val:BeeItemDB.createStackByCanonicalId("wheat",1),chance:0.06},   //1
            {val:BeeItemDB.createStackByCanonicalId("tomato",3),chance:0.03},   //2
            {val:BeeItemDB.createStackByCanonicalId("tomato",1),chance:0.09},   //2
            {val:BeeItemDB.createStackByCanonicalId("tomato",1),chance:0.03},   //2
            {val:BeeItemDB.createStackByCanonicalId("tomato",1),chance:0.03},   //2
            {val:BeeItemDB.createStackByCanonicalId("cucumber",3),chance:0.03},   //3
            {val:BeeItemDB.createStackByCanonicalId("cucumber",1),chance:0.03},   //3
            {val:BeeItemDB.createStackByCanonicalId("cucumber",1),chance:0.09},   //3
            {val:BeeItemDB.createStackByCanonicalId("cucumber",1),chance:0.09},   //3 
            {val:BeeItemDB.createStackByCanonicalId("cucumber",1),chance:0.03},   //3
            {val:BeeItemDB.createStackByCanonicalId("cabage",3),chance:0.002},   //4
        ],
        mapPos:new Vector2(0,1)
    }
];

/* [

    Monster.raco_base,
    Monster.slime_base,
    Monster.moth_base
]*/

/**{
            name:"Slime",
            money:2,
            hp:50,
            str:2,
            agi:6,
            int:0,
            dex:3,
            luk:12
        } */