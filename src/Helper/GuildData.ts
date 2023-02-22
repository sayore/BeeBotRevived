import _ from "lodash";
import { clientBee, db } from '../app';

export const msgkey = "msg_";

export class GuildData {
  id: string;
  welcomeMessageChannel: string;
  welcomeMessage: string;
  welcomeMessageEnabled: boolean;
  extra:any;
  constructor() {
    this.welcomeMessageChannel = "";
    this.welcomeMessage = "";
    this.welcomeMessageEnabled = false;
    this.extra = {messageRedirects:{}};
  }

  setWelcomeMessageChannel(channel: string) {
    this.welcomeMessageChannel = channel;
    return this;
  }

  static async getGuildById(guildid: string): Promise<GuildData> {
    var key = msgkey + guildid;
    if (await db.exists(key)) {
        let userdata =new GuildData()
        _.assignIn(userdata,await (JSON.parse(await db.get(key))));
  
        return userdata;
    } else {
        console.log("New Guild: " + guildid)
        var userdata = new GuildData();
        userdata.id = guildid;

        this.setGuildById(guildid, userdata);

        return userdata;
    }
  }
  static async setGuildById(guildid: string, guilddata: GuildData) {
    console.log("saved" + msgkey + guildid+ JSON.stringify(guilddata)); 
    return await db.put(msgkey + guildid, JSON.stringify(guilddata));
  }
}