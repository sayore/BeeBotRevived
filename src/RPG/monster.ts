import { Vector2 } from "supernode/Math/Vector2";

class BaseMonster {
    type:"normal"
    _name:string = "No Name Monster"
    _elementar:("fire"|"earth"|"wind"|"stone"|"metal"|"light"|"dark"|"void"|"slime")[] = [];
    _hp:number=1
    _money: number=1
    _str: number=5
    _agi: number=5
    _vit: number=5
    _int: number=5
    _dex: number=5
    _luk: number=5
    
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