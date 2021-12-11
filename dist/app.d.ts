import * as Discord from 'discord.js';
import level from 'level-ts';
import { TypeOfApplication, SafetyMode, Application } from 'supernode/Base/Application';
import { ApplicationCollection } from 'supernode/Base/ApplicationCollection';
import { ExpressApplication } from 'supernode/Base/ExpressApplication';
export declare let clientBee: Discord.Client<boolean>;
export declare let clientBob: Discord.Client<boolean>;
export declare let db: level<any>;
export declare let EnvFile: string;
export declare class BeeApplication implements Application {
    beeToken: string;
    bobToken: string;
    constructor(beeToken: string, bobToken: string);
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
    Type: TypeOfApplication.Express;
    uid: string;
    error?(eventdata?: any): void;
    exit?(eventdata?: any): void;
    needsSafeMode?: SafetyMode;
    init(eventdata?: any): void;
    typeOfApplication: TypeOfApplication;
}
export declare class _BeeBotApps extends ApplicationCollection {
    beeToken: string;
    bobToken: string;
    constructor();
    init(): void;
    applications: Application[];
}
export declare let BeeBotApps: _BeeBotApps;
