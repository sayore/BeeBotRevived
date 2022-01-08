"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPGCommands = void 0;
const monster_1 = require("../RPG/monster");
const lodash_1 = __importDefault(require("lodash"));
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const rpg_1 = require("../RPG/rpg");
const Vector2_1 = require("supernode/Math/Vector2");
const command_helper_1 = require("./command.helper");
function timeLeft(dtn) {
    var dt = new Date(dtn);
    return dt.getMinutes() + ":" + dt.getSeconds().toString().padEnd(2, "0");
}
function arrive(channel, user) {
    user.rpg.position = user.extra.walkingTo;
    delete user.extra.walkingTo;
    delete user.extra.walkingUntil;
    var chan = app_1.clientBee.channels.resolve(channel);
    if (!chan.isText())
        return;
    chan.send("<@!" + user.id + "> arrived at " + rpg_1.RPG.getPositionPlace(new Vector2_1.Vector2(user.rpg.position.x, user.rpg.position.y)).name);
}
exports.RPGCommands = [
    {
        messagecontent: "forage",
        cmd(msg, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!!user.extra && user.extra.walkingUntil)
                    if (Date.now() < user.extra.walkingUntil) {
                        msg.channel.send("You are currently walking! (means no foresting possible)");
                        return;
                    }
                //if(false)
                if (!!user.extra && !!user.extra.noForageUntil)
                    if (Date.now() < user.extra.noForageUntil) {
                        var canForageAgain = new Date(user.extra.noForageUntil - Date.now());
                        msg.channel.send("You already foraged! (You can forage in " + timeLeft(canForageAgain.getTime()) + " min again)");
                        return;
                    }
                var place = lodash_1.default.clone(monster_1.Places.find(p => p.mapPos.asString() == rpg_1.RPG.getPosition(user.rpg).asString()));
                var found = [];
                var tempInv = [];
                //var execs = "";
                place.foragable.forEach((fa) => {
                    //console.log(fa)
                    if (Math.random() <= fa.chance) {
                        //console.log(fa)
                        found.push(fa.val);
                        var invFind = user.rpg.inventory.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                        if (!invFind) {
                            user.rpg.inventory.push(lodash_1.default.clone(fa.val));
                        }
                        else
                            invFind.Amount += fa.val.Amount;
                        var tempInvFind = tempInv.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                        if (!tempInvFind) {
                            tempInv.push(lodash_1.default.clone(fa.val));
                        }
                        else
                            tempInvFind.Amount += fa.val.Amount;
                    }
                    //execs+="chance:"+fa.chance+" ";
                    //execs+="amt"+fa.val.Amount+"\n";
                });
                //console.log(execs)
                msg.channel.send((found.length == 0 ? "Nothing found!" :
                    "Found:\n" + tempInv.map(v => v.Amount + "x " + v.Item.Name).join('\n')));
                if (user.extra == undefined)
                    user.extra = {};
                //! NEEDS TO BE CHANGED BACK TO 5s FOR LIVE
                if (msg.member.id != "562640877705756690")
                    user.extra['noForageUntil'] = Date.now() + 60 * 1000 * 5 - (user.rpg.agi / 1000 * 60 * 1000 * 5);
                user.rpg.money++;
                //await setUser(msg.member,user); 
            });
        }
    },
    {
        triggerfunc: (msg) => lodash_1.default.toLower(msg.content) == "inv",
        cmd: (msg, user) => __awaiter(void 0, void 0, void 0, function* () {
            msg.reply(user.rpg.inventory.map(v => v.Amount + "x " + v.Item.Name).join('\n'));
        })
    },
    {
        triggerfunc: (msg) => lodash_1.default.startsWith(msg.content, "walk"),
        cmd: (msg, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!!user.extra && user.extra.walkingUntil)
                if (Date.now() < user.extra.walkingUntil) {
                    msg.channel.send("You are currently walking!");
                    return;
                }
            var words = lodash_1.default.words(msg.content.toLowerCase());
            var movVec = new Vector2_1.Vector2(0, 0);
            if (words.length != 2)
                return;
            switch (words[1]) {
                case "nord":
                case "up":
                case "north":
                    movVec = new Vector2_1.Vector2(0, -1);
                    break;
                case "south":
                case "down":
                    movVec = new Vector2_1.Vector2(0, 1);
                    break;
                case "right":
                case "east":
                    movVec = new Vector2_1.Vector2(1, 0);
                    break;
                case "left":
                case "west":
                    movVec = new Vector2_1.Vector2(-1, 0);
                    break;
            }
            if (!user.rpg.position)
                user.rpg.position = new Vector2_1.Vector2(0, 0);
            var targetPos = new Vector2_1.Vector2(0, 0).add(user.rpg.position).add(movVec);
            var tPlace = rpg_1.RPG.getPositionPlace(targetPos);
            if (tPlace) {
                var walkTime = 40 * 1000 - (user.rpg.agi / 1000 * 40 * 1000);
                user.extra['walkingUntil'] = Date.now() + walkTime;
                user.extra['walkingTo'] = targetPos;
                msg.reply("You start walking towards " + tPlace.name + "(" + tPlace.shortname + ")! This will take you " + timeLeft(walkTime));
                setTimeout(() => arrive(msg.channel.id, user), walkTime);
            }
            else
                msg.reply((0, command_helper_1.getRandom)([
                    "You only see darkness.",
                    "A void is starring back at you.",
                    "A dark wall is blocking your path.",
                    "You could die walking into this darkness.",
                    "You can see a light in the far out. But the darkness is still closer.",
                    "This darkness lingers and will eat you if you go here. Dont."
                ]));
            //await user.save();
        })
    },
    {
        triggerfunc: (msg) => lodash_1.default.startsWith(msg.content, "look"),
        cmd: (msg, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!!user.extra && user.extra.walkingUntil)
                if (Date.now() < user.extra.walkingUntil) {
                    msg.channel.send("You are currently walking!");
                    return;
                }
            var words = lodash_1.default.words(msg.content.toLowerCase());
            var movVec = new Vector2_1.Vector2(0, 0);
            if (words.length != 2)
                return;
            switch (words[1]) {
                case "nord":
                case "up":
                case "north":
                    movVec = new Vector2_1.Vector2(0, -1);
                    break;
                case "south":
                case "down":
                    movVec = new Vector2_1.Vector2(0, 1);
                    break;
                case "right":
                case "east":
                    movVec = new Vector2_1.Vector2(1, 0);
                    break;
                case "left":
                case "west":
                    movVec = new Vector2_1.Vector2(-1, 0);
                    break;
                case "here":
                default:
                    movVec = new Vector2_1.Vector2(0, 0);
                    break;
            }
            if (!user.rpg.position)
                user.rpg.position = new Vector2_1.Vector2(0, 0);
            var targetPos = new Vector2_1.Vector2(0, 0).add(user.rpg.position).add(movVec);
            var tPlace = monster_1.Places.find(p => {
                return p.mapPos.asString() == targetPos.asString();
            });
            if (tPlace)
                msg.reply("You see " + tPlace.name + " ||`" + tPlace.shortname + "`||\n" + "There are " + (!!tPlace.monster ? (tPlace.monster.length >= 1 ? "mobs" : "no mobs") : "no mobs") + " and there are " + (!!tPlace.foragable ? (tPlace.foragable.length >= 1 ? "forageables(" + tPlace.foragable.length + ")" : "no forageables") : "no mobs") + " goods!");
            else
                msg.reply((0, command_helper_1.getRandom)([
                    "You only see darkness.",
                    "A void is starring back at you.",
                    "A dark wall is blocking your path.",
                    "You could die walking into this darkness.",
                    "You can see a light in the far out. But the darkness is still closer.",
                    "This darkness lingers and will eat you if you go here. Dont."
                ]));
        })
    },
    {
        triggerfunc: (msg) => lodash_1.default.startsWith(msg.content, "debug"),
        cmd: (msg, user) => __awaiter(void 0, void 0, void 0, function* () {
            var e_1, _a;
            Logging_1.Logging.setLogTarget(Logging_1.LogLevel.Testing, Logging_1.LogTarget.Textfile);
            var iterator = app_1.db.iterate({ all: "user", keys: true });
            try {
                for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
                    const { key, value } = iterator_1_1.value;
                    Logging_1.Logging.log(key + ": " + JSON.stringify(value), Logging_1.LogLevel.Testing);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) yield _a.call(iterator_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            yield iterator.end();
        })
    }
];
//# sourceMappingURL=rpg.js.map