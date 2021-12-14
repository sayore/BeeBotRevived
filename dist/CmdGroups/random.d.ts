import { Chanceable } from "supernode/Math/mod";
export declare class RandomEvents {
    actions: any[];
    crnttimeout: any;
    env: any;
    sentencesBee: Chanceable<string>[];
    constructor();
    randomAction(): void;
    start(): void;
}
