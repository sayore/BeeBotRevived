import _ from "lodash";
import { clientBee, db } from '../app';

export const guildkey = "guild_";

class GuildData {
  id: string;
  welcomeMessageChannel: string;
  welcomeMessage: string;
  welcomeMessageEnabled: boolean;
  constructor() {
    this.welcomeMessageChannel = "";
    this.welcomeMessage = "";
    this.welcomeMessageEnabled = false;
  }

  setWelcomeMessageChannel(channel: string) {
    this.welcomeMessageChannel = channel;

  }
}
export async function getGuildById(guildid: string): Promise<GuildData> {
  var key = guildkey + guildid;
  if (await db.exists(key)) {
      let userdata =new GuildData()
      _.assignIn(userdata,await (JSON.parse(await db.get(key))));

      return userdata;
  } else {
      console.log("New User")
      var userdata = new GuildData();
      userdata.id = guildid;

      return userdata;
  }
}
export async function setGuildByID(guildid: string, guilddata: GuildData) {
  console.log("saved" + " user" + guildid+ JSON.stringify(guilddata)); 
  return await db.put(guildkey + guildid, JSON.stringify(guilddata));
}