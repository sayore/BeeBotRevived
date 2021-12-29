import { ICommand } from '../CmdGroups/icommands';
import { Places } from '../RPG/monster';
import { ItemStack } from 'supernode/Game/ItemStack';
import _ from 'lodash';
import { setUser } from '../Helper/user';
import { Logging, LogLevel, LogTarget } from 'supernode/Base/Logging';
import { db } from '../app';
import { RPG } from '../RPG/rpg';


export let RPGCommands: ICommand[] = [
    {
        messagecontent: "forage",
        async cmd(msg,user) {
            if(!!user.extra &&user.extra.walkingUntil)
            if (Date.now() < user.extra.walkingUntil) {
                msg.channel.send("You are currently walking! (means no foresting possible)")
                return;
            }
            //if(false)
            if(!!user.extra && !!user.extra.noForageUntil)
            if (Date.now() < user.extra.noForageUntil) {
                var canForageAgain = new Date(user.extra.noForageUntil-Date.now());
                msg.channel.send("You already foraged! (You can forage in " + canForageAgain.getMinutes() +":"+ canForageAgain.getSeconds().toString().padEnd(2,"0") + " min again)")
                return;
            }

            var place = Places.find(p => p.mapPos.asString() == RPG.getPosition(user.rpg).asString());
            var found: ItemStack[] = []
            place.foragable.forEach((fa) => {
                //console.log(fa)
                if (Math.random() <= fa.chance) {
                    //console.log(fa)
                    found.push(_.clone(fa.val))
                    var invFind = user.rpg.inventory.find(is=>is.Item.CanonicalId==fa.val.Item.CanonicalId);
                    if(!invFind){
                        user.rpg.inventory.push(fa.val);
                    } else
                    invFind.Amount+=fa.val.Amount;
                }
            })
            msg.channel.send((found.length == 0 ? "Nothing found!" :
                "Found:\n" + found.map((is) => is.Item.Name + "\n").join())
            );
            user.extra['noForageUntil'] = Date.now() + 60 * 1000 * 5 - (user.rpg.agi / 1000 * 60 * 1000 * 5);

            user.rpg.money++;
            //await setUser(msg.member,user); 


        }
    },
    {
        triggerfunc: (msg) => _.startsWith(msg.content, "walk"),
        cmd: async (msg, user) => {
            if(!!user.extra &&user.extra.walkingUntil)
            if (Date.now() < user.extra.walkingUntil) {
                msg.channel.send("You are currently walking!")
                return;
            }

            var words = _.words(msg.content.toLowerCase());
            if (words.some(w => "north")) { }
            user.extra['walkingUntil'] = Date.now() + 20 * 1000 - (user.rpg.agi / 1000 * 20 * 1000);

            //await user.save();
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(msg.content, "debug"),
        cmd: async (msg, user) => {
            Logging.setLogTarget(LogLevel.Testing,LogTarget.Textfile)
            let iterator = db.iterate({ all: "user", keys: true });

            for await (const { key, value } of iterator) {
                Logging.log(key+ ": " +JSON.stringify(value),LogLevel.Testing)
            }
            await iterator.end();
        }
    }
]