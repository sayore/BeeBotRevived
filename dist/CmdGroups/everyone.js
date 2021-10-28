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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EveryoneCommands = void 0;
const icommands_1 = require("./icommands");
const app_1 = require("../app");
const db_helper_1 = require("../db.helper");
exports.EveryoneCommands = [
    {
        typeofcmd: icommands_1.TypeOfCmd.Information,
        always: true,
        cmd(msg) {
            return __awaiter(this, void 0, void 0, function* () {
                yield db_helper_1.DBHelper.increase(app_1.db, "user" + msg.member.id + ".msgs", 1);
                console.log(yield app_1.db.get("user" + msg.member.id + ".msgs"));
            });
        }
    }
];
//# sourceMappingURL=everyone.js.map