import { Chanceable } from "supernode/Math/Chanceable";
import { Vector2 } from "supernode/Math/Vector2";
import { ItemStack } from 'supernode/Game/ItemStack';
declare class BaseMonster {
    type: "normal";
    private _name;
    private _elementar;
    private _hp;
    private _money;
    private _str;
    private _agi;
    private _vit;
    private _int;
    private _dex;
    private _luk;
    private _loot;
    get Name(): string;
    get Elementar(): ("fire" | "earth" | "wind" | "stone" | "metal" | "light" | "dark" | "void" | "slime")[];
    get Hp(): number;
    get Money(): number;
    get Str(): number;
    get Agi(): number;
    get Vit(): number;
    get Int(): number;
    get Dex(): number;
    get Luk(): number;
    set Name(name: string);
    set Elementar(elements: ("fire" | "earth" | "wind" | "stone" | "metal" | "light" | "dark" | "void" | "slime")[]);
    set Hp(value: number);
    set Money(value: number);
    set Str(value: number);
    set Agi(value: number);
    set Vit(value: number);
    set Int(value: number);
    set Dex(value: number);
    set Luk(value: number);
    setName(name: string): this;
    setElementar(elements: ("fire" | "earth" | "wind" | "stone" | "metal" | "light" | "dark" | "void" | "slime")[]): this;
    setHp(value: number): this;
    setMoney(value: number): this;
    setStr(value: number): this;
    setAgi(value: number): this;
    setVit(value: number): this;
    setInt(value: number): this;
    setDex(value: number): this;
    setLuk(value: number): this;
    addLoot(isc: Chanceable<ItemStack>): this;
    addLoots(iscs: Chanceable<ItemStack>[]): this;
    onAttack?(): any;
    onEncounter?(): any;
    onDefeat?(): any;
}
interface IPlace {
    shortname: string;
    name: string;
    monster: Chanceable<BaseMonster>[];
    foragable?: Chanceable<ItemStack>[];
    canGoTo?: string[];
    mapPos?: Vector2;
}
export declare let Monster: {
    raco_base: BaseMonster;
    slime_base: BaseMonster;
    moth_base: BaseMonster;
};
export declare const Places: IPlace[];
export {};
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
