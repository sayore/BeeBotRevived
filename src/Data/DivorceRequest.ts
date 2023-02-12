export class DivorceRequest {
    public id: string;
    public requester: string;
    public target: string;
    public timestamp: number;
    public constructor(requester: string, target: string) {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.requester = requester;
        this.target = target;
        this.timestamp = Date.now();
    }
}