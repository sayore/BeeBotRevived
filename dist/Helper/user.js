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
exports.iterateSortedFilter = exports.setUser = exports.setUserByID = exports.getUser = exports.Userdata = exports.userkey = void 0;
const rpg_1 = require("../RPG/rpg");
const app_1 = require("../app");
const lodash_1 = __importDefault(require("lodash"));
exports.userkey = "userj";
class Userdata {
    constructor() {
        this.msgs = 0;
        this.fetchCounter = 0;
        this.rpg = new rpg_1.RPGData();
    }
    test() {
    }
    getSent(type) {
        return __awaiter(this, void 0, void 0, function* () {
            var key = "action::" + type + "Sent::" + this.id;
            let ret = 0;
            if (yield app_1.db.exists(key)) {
                ret = (yield app_1.db.get(key));
            }
            return (ret ? ret : 0);
        });
    }
    getReceived(type) {
        return __awaiter(this, void 0, void 0, function* () {
            var key = "action::" + type + "Received::" + this.id;
            let ret = 0;
            if (yield app_1.db.exists(key)) {
                ret = (yield app_1.db.get(key));
            }
            return (ret ? ret : 0);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield setUserByID(this.id, this);
            console.log(this);
        });
    }
}
exports.Userdata = Userdata;
function getUser(userid, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        var key = exports.userkey + userid;
        if (yield app_1.db.exists(key)) {
            let userdata = new Userdata();
            lodash_1.default.assignIn(userdata, yield (JSON.parse(yield app_1.db.get(key))));
            /*userdata.rpg = <RPG>_.assignIn(new RPG(), userdata.rpg);
            userdata.rpg.position = new Vector2(userdata.rpg.position.x,userdata.rpg.position.y);
            userdata.id = userid;*/
            return userdata;
        }
        else {
            console.log("New User");
            var userdata = new Userdata();
            userdata.id = userid;
            return userdata;
        }
    });
}
exports.getUser = getUser;
function setUserByID(userid, userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("saved" + " user" + userid + JSON.stringify(userdata));
        return yield app_1.db.put(exports.userkey + userid, JSON.stringify(userdata));
    });
}
exports.setUserByID = setUserByID;
function setUser(user, userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userdata.id) {
            return yield app_1.db.del(exports.userkey + user.id);
        }
        userdata.fetchCounter++;
        userdata.tag = user.displayName;
        userdata.color = user.displayColor;
        userdata.hexcolor = user.displayHexColor;
        try {
            yield user.user.fetch();
            userdata.accentcolor = user.user.accentColor;
            userdata.hexaccentcolor = user.user.hexAccentColor;
        }
        catch (e) {
            console.log("Could not fetch user.\nWe got: ", userdata);
        }
        //console.log(user);
        return yield app_1.db.put(exports.userkey + user.id, JSON.stringify(userdata));
    });
}
exports.setUser = setUser;
function iterateSortedFilter(enumeF) {
    return __awaiter(this, void 0, void 0, function* () {
        let listed = yield (yield app_1.db.iterateFilter((v) => { return (!!v.msgs); })).sort();
    });
}
exports.iterateSortedFilter = iterateSortedFilter;
//# sourceMappingURL=user.js.map