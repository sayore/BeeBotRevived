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
                        msg.channel.send("You already foraged! (You can forage in " + canForageAgain.getMinutes() + ":" + canForageAgain.getSeconds().toString().padEnd(2, "0") + " min again)");
                        return;
                    }
                var place = monster_1.Places.find(p => p.mapPos.asString() == rpg_1.RPG.getPosition(user.rpg).asString());
                var found = [];
                var tempInv = [];
                place.foragable.forEach((fa) => {
                    //console.log(fa)
                    if (Math.random() <= fa.chance) {
                        //console.log(fa)
                        found.push(lodash_1.default.clone(fa.val));
                        var invFind = user.rpg.inventory.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                        if (!invFind) {
                            user.rpg.inventory.push(fa.val);
                        }
                        else
                            invFind.Amount += fa.val.Amount;
                        var tempInvFind = tempInv.find(is => is.Item.CanonicalId == fa.val.Item.CanonicalId);
                        if (!tempInvFind) {
                            tempInv.push(fa.val);
                        }
                        else
                            tempInvFind.Amount += fa.val.Amount;
                    }
                });
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
            if (words.some(w => "north")) { }
            user.extra['walkingUntil'] = Date.now() + 20 * 1000 - (user.rpg.agi / 1000 * 20 * 1000);
            //await user.save();
        })
    },
    {
        triggerfunc: (msg) => lodash_1.default.startsWith(msg.content, "debug"),
        cmd: (msg, user) => __awaiter(void 0, void 0, void 0, function* () {
            var e_1, _a;
            Logging_1.Logging.setLogTarget(Logging_1.LogLevel.Testing, Logging_1.LogTarget.Textfile);
            let iterator = app_1.db.iterate({ all: "user", keys: true });
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