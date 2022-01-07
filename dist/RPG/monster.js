"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Places = exports.Monster = void 0;
const Vector2_1 = require("supernode/Math/Vector2");
const lodash_1 = __importDefault(require("lodash"));
const itemdb_1 = require("./itemdb");
class BaseMonster {
    constructor() {
        this._name = "No Name Monster";
        this._elementar = [];
        this._hp = 1;
        this._money = 1;
        this._str = 5;
        this._agi = 5;
        this._vit = 5;
        this._int = 5;
        this._dex = 5;
        this._luk = 5;
    }
    get Name() { return this._name; }
    get Elementar() { return this._elementar; }
    ;
    get Hp() { return this._hp; }
    ;
    get Money() { return this._money; }
    get Str() { return this._str; }
    get Agi() { return this._agi; }
    get Vit() { return this._vit; }
    get Int() { return this._int; }
    get Dex() { return this._dex; }
    get Luk() { return this._luk; }
    set Name(name) { this._name = name; }
    set Elementar(elements) { this._elementar = elements; }
    ;
    set Hp(value) { this._hp = value; }
    ;
    set Money(value) { this._money = value; }
    set Str(value) { this._str = value; }
    set Agi(value) { this._agi = value; }
    set Vit(value) { this._vit = value; }
    set Int(value) { this._int = value; }
    set Dex(value) { this._dex = value; }
    set Luk(value) { this._luk = value; }
    setName(name) { this.Name = name; return this; }
    setElementar(elements) { this.Elementar = elements; return this; }
    ;
    setHp(value) { this.Hp = value; return this; }
    ;
    setMoney(value) { this.Money = value; return this; }
    setStr(value) { this.Str = value; return this; }
    setAgi(value) { this.Agi = value; return this; }
    setVit(value) { this.Vit = value; return this; }
    setInt(value) { this.Int = value; return this; }
    setDex(value) { this.Dex = value; return this; }
    setLuk(value) { this.Luk = value; return this; }
    addLoot(isc) { this._loot.push(isc); return this; }
    addLoots(iscs) { this._loot = lodash_1.default.concat(this._loot, iscs); return this; }
}
exports.Monster = {
    raco_base: new BaseMonster()
        .setName("Raco")
        .setStr(2),
    slime_base: new BaseMonster()
        .setName("Slime")
        .setStr(2)
        .addLoots([
        { chance: 0.2, val: itemdb_1.BeeItemDB.createStackByCanonicalId("cheese", 1) }
    ]),
    moth_base: new BaseMonster()
        .setName("Moth")
        .setStr(4)
        .setInt(9)
};
exports.Places = [
    {
        shortname: "prontera",
        name: "Prontera",
        monster: [],
        foragable: [
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.8 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.3 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.1 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.08 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.05 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.06 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.05 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.04 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.02 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.02 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.01 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("stone", 1), chance: 0.003 },
            { val: itemdb_1.BeeItemDB.createStackByCanonicalId("money1", 1), chance: 0.03 },
        ],
        //npcs:[],
        mapPos: new Vector2_1.Vector2(0, 0)
    }, {
        shortname: "ptr_fld1",
        name: "Prontera Fields 1",
        monster: [
            { val: exports.Monster.raco_base, chance: 3 },
            { val: exports.Monster.slime_base, chance: 7 },
            { val: exports.Monster.moth_base, chance: 1 }
        ],
        mapPos: new Vector2_1.Vector2(0, 1)
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
//# sourceMappingURL=monster.js.map