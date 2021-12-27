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
exports.iterateSortedFilter = exports.setUser = exports.getUser = exports.Userdata = void 0;
const rpg_1 = require("../RPG/rpg");
const app_1 = require("../app");
const lodash_1 = __importDefault(require("lodash"));
class Userdata {
    constructor() {
        this.msgs = 0;
        this.fetchCounter = 0;
        this.rpg = new rpg_1.RPG();
    }
    test() {
        //console.log("Test Executed")
    }
}
exports.Userdata = Userdata;
function getUser(userid, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        var key = "user" + userid;
        if (yield app_1.db.exists(key)) {
            let userdata = lodash_1.default.assignIn(new Userdata(), yield (app_1.db.get(key)));
            userdata.rpg = lodash_1.default.assignIn(new rpg_1.RPG(), userdata.rpg);
            userdata.id = userid;
            return userdata;
        }
        else {
            console.log("New User");
            return new Userdata();
        }
    });
}
exports.getUser = getUser;
function setUser(user, userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userdata.id) {
            return yield app_1.db.del("user" + user.id);
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
        return yield app_1.db.put("user" + user.id, userdata);
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