"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestReactions = void 0;
exports.TestReactions = [
    {
        customId: "bbtext",
        typeOfInteraction: "Button",
        reaction: (interaction, clicker) => {
            console.log("Clicked!");
            console.log("Clicked by " + clicker.id);
            console.log("User has " + clicker.rpg.allExp() + " EXP");
        }
    }
];
//# sourceMappingURL=testreactions.js.map