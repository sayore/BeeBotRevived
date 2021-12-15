import { Chanceable } from "supernode/Math/mod";
export declare class RandomEvents {
    static actions: any[];
    crnttimeout: any;
    env: any;
    sentencesBee: Chanceable<string>[];
    constructor();
    randomAction(): void;
    started: boolean;
    start(): void;
}
