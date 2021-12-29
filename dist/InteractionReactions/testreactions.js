"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestReactions = void 0;
const rpg_1 = require("../RPG/rpg");
exports.TestReactions = [
    {
        customId: "bbtext",
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => {
            console.log("Clicked!");
            console.log("Clicked by " + clicker.id);
            console.log("User has " + rpg_1.RPG.allExp(clicker.rpg) + " EXP");
        }
    }
];
//# sourceMappingURL=testreactions.js.map