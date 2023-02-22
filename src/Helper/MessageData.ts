import _ from "lodash";
import { clientBee, db } from '../app';

export const guildkey = "guild_";

export class MessageData {
  id: string;
  
  extra:any;

  constructor() {
    this.extra = {};
  }

  setMessage(message: string) {
    this.extra.message = message;

    // Get Discord Message object via fetch
    clientBee.channels.fetch(this.extra.channelId).then(channel => {
      // Check if channel is a text channel
      if (channel?.isText()) {
        channel.messages.fetch(this.id).then(message => {
          message.edit(this.extra.message);
        })
      }
    });

    return this;
  }
    

  static async getMessageById(messageId: string): Promise<MessageData> {
    var key = guildkey + messageId;
    if (await db.exists(key)) {
        let messagedata =new MessageData()
        _.assignIn(messagedata,await (JSON.parse(await db.get(key))));
  
        return messagedata;
    } else {
        console.log("New Message")
        var messagedata = new MessageData();
        messagedata.id = messageId;
  
        return messagedata;
    }
  }
  static async setMessageById(messageId: string, guilddata: MessageData) {
    console.log("saved" + guildkey + messageId+ JSON.stringify(guilddata)); 
    return await db.put(guildkey + messageId, JSON.stringify(guilddata));
  }

  // Save the data to the database
  async save() {
    MessageData.setMessageById(this.id, this);
  }
}