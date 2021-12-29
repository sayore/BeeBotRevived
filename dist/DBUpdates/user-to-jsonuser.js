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
const lodash_1 = __importDefault(require("lodash"));
const Logging_1 = require("supernode/Base/Logging");
const app_1 = require("../app");
const user_1 = require("../Helper/user");
const rpg_1 = require("../RPG/rpg");
(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a, e_2, _b;
    function isOldUserObject(key) {
        return key.startsWith("user") && ["1234567890"].includes(key[5]);
    }
    ///@ts-ignore
    let iterator = app_1.db.iterate({ all: "user", keys: true });
    try {
        for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
            const { key, value } = iterator_1_1.value;
            if (lodash_1.default.isObjectLike(value))
                if (!!value.id)
                    if (!key.startsWith("userj"))
                        if (!value.converted) {
                            console.log("Converting old User Profile...");
                            let userdata = new user_1.Userdata();
                            lodash_1.default.assignIn(userdata, yield (yield app_1.db.get(key)));
                            userdata.rpg = lodash_1.default.assignIn(new rpg_1.RPG(), userdata.rpg);
                            console.log("Success?...");
                            app_1.db.put("userj" + value.id, JSON.stringify(userdata));
                            Logging_1.Logging.log(key + ": " + JSON.stringify(value), Logging_1.LogLevel.Testing);
                            app_1.db.put(key, value);
                            value.converted = true;
                        }
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
    iterator = app_1.db.iterate({ all: "userj", keys: true });
    try {
        for (var iterator_2 = __asyncValues(iterator), iterator_2_1; iterator_2_1 = yield iterator_2.next(), !iterator_2_1.done;) {
            const { key, value } = iterator_2_1.value;
            Logging_1.Logging.log(key + ": " + JSON.stringify(value), Logging_1.LogLevel.Testing);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (iterator_2_1 && !iterator_2_1.done && (_b = iterator_2.return)) yield _b.call(iterator_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    yield iterator.end();
}))();
//# sourceMappingURL=user-to-jsonuser.js.map