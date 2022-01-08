import { ICommand } from '../CmdGroups/icommands';
import { Places } from '../RPG/monster';
import { ItemStack } from 'supernode/Game/ItemStack';
import _ from 'lodash';
import { setUser, Userdata } from '../Helper/user';
import { Logging, LogLevel, LogTarget } from 'supernode/Base/Logging';
import { clientBee, db } from '../app';
import { RPG } from '../RPG/rpg';
import { Vector2 } from 'supernode/Math/Vector2';
import { getRandom } from './command.helper';
import * as Discord from 'discord.js';


function timeLeft(dtn: number) {
    var dt = new Date(dtn);
    return dt.getMinutes() + ":" + dt.getSeconds().toString().padEnd(2, "0")
}
function arrive(channel: string, user: Userdata) {
    user.rpg.position = user.extra.walkingTo;
    delete user.extra.walkingTo;
    delete user.extra.walkingUntil;

    var chan = clientBee.channels.resolve(channel);
    if (!chan.isText()) return;

    chan.send("<@!" + user.id + "> arrived at " + RPG.getPositionPlace(new Vector2(user.rpg.position.x,user.rpg.position.y)).name)
}

export var RPGCommands: ICommand[] = [
    {
        messagecontent: "forage",
        async cmd(msg, user) {
            if (!!user.extra && user.extra.walkingUntil)
                if (Date.now() < user.extra.walkingUntil) {
                    msg.channel.send("You are currently walking! (means no foresting possible)")
                    return;
                }
            //if(false)
            if (!!user.extra && !!user.extra.noForageUntil)
                if (Date.now() < user.extra.noForageUntil) {
                    var canForageAgain = new Date(user.extra.noForageUntil - Date.now());
                    msg.channel.send("You already foraged! (You can forage in " + timeLeft(canForageAgain.getTime()) + " min again)")
                    return;
                }

            var place = _.clone(Places.find(p => p.mapPos.asString() == RPG.getPosition(user.rpg).asString()));
            var found: ItemStack[] = []
            var tempInv: ItemStack[] = [];
            //var execs = "";
            place.foragable.forEach((fa) => {
                //console.log(fa)
                if (Math.random() <= fa.chance) {
                    //console.log(fa)
                    found.push(fa.val)

                    var invFind = user.rpg.inventory.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                    if (!invFind) {
                        user.rpg.inventory.push(_.clone(fa.val));
                    } else
                        invFind.Amount += fa.val.Amount;

                    var tempInvFind = tempInv.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                    if (!tempInvFind) {
                        tempInv.push(_.clone(fa.val));
                    } else
                        tempInvFind.Amount += fa.val.Amount;
                }
                //execs+="chance:"+fa.chance+" ";
                //execs+="amt"+fa.val.Amount+"\n";
            })
            //console.log(execs)
            msg.channel.send((found.length == 0 ? "Nothing found!" :
                "Found:\n" + tempInv.map(v => v.Amount + "x " + v.Item.Name).join('\n'))
            );
            if (user.extra == undefined) user.extra = {}
            //! NEEDS TO BE CHANGED BACK TO 5s FOR LIVE
            if (msg.member.id != "562640877705756690")
                user.extra['noForageUntil'] = Date.now() + 60 * 1000 * 5 - (user.rpg.agi / 1000 * 60 * 1000 * 5);

            user.rpg.money++;
            //await setUser(msg.member,user); 


        }
    },
    {
        triggerfunc: (msg) => _.toLower(msg.content) == "inv",
        cmd: async (msg, user) => {
            msg.reply(user.rpg.inventory.map(v => v.Amount + "x " + v.Item.Name).join('\n'))
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(msg.content, "walk"),
        cmd: async (msg, user) => {
            if (!!user.extra && user.extra.walkingUntil)
                if (Date.now() < user.extra.walkingUntil) {
                    msg.channel.send("You are currently walking!")
                    return;
                }

            var words = _.words(msg.content.toLowerCase());
            var movVec = new Vector2(0, 0);
            if (words.length != 2) return;
            switch (words[1]) {
                case "nord":
                case "up":
                case "north":
                    movVec = new Vector2(0, -1); break;
                case "south":
                case "down":
                    movVec = new Vector2(0, 1); break;
                case "right":
                case "east":
                    movVec = new Vector2(1, 0); break;
                case "left":
                case "west":
                    movVec = new Vector2(-1, 0); break;
            }

            if (!user.rpg.position) user.rpg.position = new Vector2(0, 0);
            var targetPos = new Vector2(0, 0).add(user.rpg.position as Vector2).add(movVec);
            var tPlace = RPG.getPositionPlace(targetPos)

            if (tPlace) {
                var walkTime = 40 * 1000 - (user.rpg.agi / 1000 * 40 * 1000);
                user.extra['walkingUntil'] = Date.now() + walkTime; 
                user.extra['walkingTo'] = targetPos;
                msg.reply("You start walking towards " + tPlace.name + "(" + tPlace.shortname + ")! This will take you " + timeLeft(walkTime));
                setTimeout(() => arrive(msg.channel.id, user), walkTime)
            } else
                msg.reply(getRandom([
                    "You only see darkness.",
                    "A void is starring back at you.",
                    "A dark wall is blocking your path.",
                    "You could die walking into this darkness.",
                    "You can see a light in the far out. But the darkness is still closer.",
                    "This darkness lingers and will eat you if you go here. Dont."
                ]))

            //await user.save();
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(msg.content, "look"),
        cmd: async (msg, user) => {
            if (!!user.extra && user.extra.walkingUntil)
                if (Date.now() < user.extra.walkingUntil) {
                    msg.channel.send("You are currently walking!")
                    return;
                }

            var words = _.words(msg.content.toLowerCase());
            var movVec = new Vector2(0, 0);
            if (words.length != 2) return;
            switch (words[1]) {
                case "nord":
                case "up":
                case "north":
                    movVec = new Vector2(0, -1); break;
                case "south":
                case "down":
                    movVec = new Vector2(0, 1); break;
                case "right":
                case "east":
                    movVec = new Vector2(1, 0); break;
                case "left":
                case "west":
                    movVec = new Vector2(-1, 0); break;
                case "here":
                default:
                    movVec = new Vector2(0, 0); break;
            }

            if (!user.rpg.position) user.rpg.position = new Vector2(0, 0);
            var targetPos = new Vector2(0, 0).add(user.rpg.position as Vector2).add(movVec);

            var tPlace = Places.find(p => {
                return p.mapPos.asString() == targetPos.asString()
            });
            if (tPlace)
                msg.reply("You see " + tPlace.name + " ||`" + tPlace.shortname + "`||\n" + "There are " + (!!tPlace.monster ? (tPlace.monster.length >= 1 ? "mobs" : "no mobs") : "no mobs") + " and there are " + (!!tPlace.foragable ? (tPlace.foragable.length >= 1 ? "forageables("+tPlace.foragable.length+")" : "no forageables") : "no mobs") + " goods!");
            else
                msg.reply(getRandom([ 
                    "You only see darkness.",
                    "A void is starring back at you.",
                    "A dark wall is blocking your path.",
                    "You could die walking into this darkness.",
                    "You can see a light in the far out. But the darkness is still closer.",
                    "This darkness lingers and will eat you if you go here. Dont."
                ]))
        }
    },
    {
        triggerfunc: (msg) => _.startsWith(msg.content, "debug"),
        cmd: async (msg, user) => {
            Logging.setLogTarget(LogLevel.Testing, LogTarget.Textfile)
            var iterator = db.iterate({ all: "user", keys: true });

            for await (const { key, value } of iterator) {
                Logging.log(key + ": " + JSON.stringify(value), LogLevel.Testing)
            }
            await iterator.end();
        }
    }
]