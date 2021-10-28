import * as Discord from 'discord.js';
import level from 'level-ts';
import { Application, SafetyMode, TypeOfApplication } from 'supernode/Base/Application';
import { ExpressApplication } from 'supernode/Base/ExpressApplication';
import { ApplicationCollection } from 'supernode/Base/ApplicationCollection';
export declare let clientBee: Discord.Client<boolean>;
export declare let clientBob: Discord.Client<boolean>;
export declare let db: level<any>;
export declare class BeeApplication implements Application {
    Type: TypeOfApplication;
    uid: string;
    error?(eventdata?: any): void;
    exit?(eventdata?: any): void;
    typeOfApplication?: TypeOfApplication;
    needsSafeMode?: SafetyMode;
    meta?: object;
    static hasStarted: boolean;
    db(): level<any>;
    init(): void;
    run(eventdata: any): Promise<void>;
}
export declare class BeeWebserverApplication extends ExpressApplication {
    subdomain: string;
    domain: string;
    Type: TypeOfApplication.Webserver;
    uid: string;
    error?(eventdata?: any): void;
    exit?(eventdata?: any): void;
    needsSafeMode?: SafetyMode;
    init(eventdata?: any): void;
    typeOfApplication: TypeOfApplication;
}
export declare let BeeBotApps: ApplicationCollection;
/** Autorun if not started externally */
/**setTimeout(()=>{
    if(!BeeApplication.hasStarted) {
        let botApp = new BeeApplication();
        botApp.init();
        botApp.run();
    }
}, 1200)*/ 
