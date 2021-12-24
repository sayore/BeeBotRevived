import { Vector2 } from "supernode/Math/Vector2";

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

    onAttack?()
    onEncounter?()
    onDefeat?()
}

interface IPlace {
    shortname:string;
    name:string;
    monster:BaseMonster[];
    canGoTo?:string[]
    mapPos?:Vector2;
}

export let Places:IPlace[] = [
    {
        shortname:"prontera",
        name:"Prontera",
        monster:[],
        mapPos:new Vector2(0,0)
    }, {
        shortname:"ptr_fld1",
        name:"Prontera Fields 1",
        monster:[
            new BaseMonster()
                    .setName("Slime")
                    .setStr(2)
        ]
    }
];

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