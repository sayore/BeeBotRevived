import { RPG } from "../RPG/rpg";
import { db } from '../app';
import _ from "lodash";

export class Userdata {
    id: string;
    tag: string;
    msgs: number = 10;
    rpg: RPG = new RPG();
    constructor() {

    }
    test(){
        //console.log("Test Executed")
    }
}

export async function getUser(userid: string): Promise<Userdata> {
    var key = "user" + userid;
    if (await db.exists(key)) {
        let userdata = <Userdata>_.assignIn(new Userdata(),await (db.get(key)));
        userdata.rpg = <RPG>_.assignIn(new RPG(), userdata.rpg);
        
        userdata.id = userid;
        return userdata;
    } else {
        console.log("New User")
        return new Userdata();
    }
}
export async function setUser(userid: string, userdata: Userdata) {
    return await db.put("user" + userid, userdata);
}

export async function iterateSortedFilter(enumeF: (v: Userdata, k: string) => boolean) {
    let listed = await (await db.iterateFilter((v) => { return (!!v.msgs); })).sort();
}