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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EveryoneCommands = void 0;
const icommands_1 = require("./icommands");
const app_1 = require("../app");
const rpg_1 = require("../RPG/rpg");
const lodash_1 = __importDefault(require("lodash"));
//import { getUser, setUser } from "./command.helper";
var randomUserIdCache = [];
exports.EveryoneCommands = [
    {
        typeofcmd: icommands_1.TypeOfCmd.Information,
        always: true,
        cmd(msg, userdata) {
            return __awaiter(this, void 0, void 0, function* () {
                //console.log("Uhm")
                //console.log(JSON.stringify(userdata))
                if ((yield app_1.db.exists("user" + msg.member.id)) && !(yield app_1.db.exists("user" + msg.member.id + "converted"))) {
                    console.log("Converting old User Profile...");
                    //let userdata =new Userdata()
                    lodash_1.default.assignIn(userdata, yield (yield app_1.db.get("user" + msg.member.id)));
                    userdata.rpg = lodash_1.default.assignIn(new rpg_1.RPG(), userdata.rpg);
                    //msg.reply(JSON.stringify(userdata));
                    console.log("Success?...");
                    app_1.db.put("user" + msg.member.id + "converted", true);
                }
                if (yield app_1.db.exists("user" + msg.member.id + "::msgs")) {
                    let msgs = yield app_1.db.get("user" + msg.member.id + "::msgs");
                    userdata.msgs += msgs;
                    rpg_1.RPG.addExp(userdata.rpg, userdata.msgs * 15);
                    yield app_1.db.del("user" + msg.member.id + "::msgs");
                }
                if (yield app_1.db.exists("user" + msg.member.id + ".msgs")) {
                    let msgs = yield app_1.db.get("user" + msg.member.id + ".msgs");
                    userdata.msgs += msgs;
                    rpg_1.RPG.addExp(userdata.rpg, userdata.msgs * 15);
                    yield app_1.db.del("user" + msg.member.id + ".msgs");
                }
                /** Always add to the msg count */
                userdata.msgs++;
                /** Filter out all users that have passed the 5s mark from the cache */
                randomUserIdCache = randomUserIdCache.filter(e => Date.now() - e.time < 5000);
                var cachedUser = randomUserIdCache.find(e => e.id == userdata.id);
                /** If the user isn't in the list, set a new timer, and also add EXP */
                if (!cachedUser) {
                    userdata.rpg = rpg_1.RPG.addExp(userdata.rpg, 7 * Math.random());
                    randomUserIdCache.push({ id: userdata.id, time: Date.now() });
                }
                console.log(rpg_1.RPG.allExp(userdata.rpg));
                //await setUser(msg.member,userdata);
                //Logging.log(await db.get("user"+msg.member.id+".msgs"))
                //return;
            });
        }
    }
];
//# sourceMappingURL=everyone.js.map