import _ from 'lodash';
import { Logging, LogLevel } from 'supernode/Base/Logging';
import { db } from '../app';
import { Userdata } from '../Helper/user';
import { RPG, RPGData } from '../RPG/rpg';

(async()=>{
    function isOldUserObject(key:string) {
        return key.startsWith("user") && ["1234567890"].includes(key[5]);
    }
    
    ///@ts-ignore
    let iterator = db.iterate({ all: "user", keys: true });

    for await (const { key, value } of iterator) {
        if(_.isObjectLike(value))
        if(!!value.id) 
        if(!key.startsWith("userj"))
        if(!value.converted) {
            console.log("Converting old User Profile...")
            let userdata =new Userdata()
            _.assignIn(userdata,await (await db.get(key)));
            userdata.rpg = <RPGData>_.assignIn(new RPG(), userdata.rpg);
            console.log("Success?...")
            db.put("userj"+value.id,JSON.stringify(userdata)); 
            Logging.log(key+ ": " +JSON.stringify(value),LogLevel.Testing)
            db.put(key,value);  
            value.converted = true;
        }
    }
    await iterator.end(); 

    iterator = db.iterate({ all: "userj", keys: true });

    for await (const { key, value } of iterator) {
        Logging.log(key+ ": " +JSON.stringify(value),LogLevel.Testing)
    }
    await iterator.end();  
})()
