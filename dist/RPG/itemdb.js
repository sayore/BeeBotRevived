"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeeItemDB = void 0;
const Item_1 = require("supernode/Game/Item");
const ItemDB_1 = require("supernode/Game/ItemDB");
let beedb = new ItemDB_1.ItemDB([
    new Item_1.Item({
        Id: -1,
        CanonicalId: "money1",
        Name: "1 $",
        Color: 'Yellow',
        Description: "Random money lying on the floor!",
        Extra: { money: 1 }
    }),
    new Item_1.Item({
        Id: 0,
        CanonicalId: "nothing",
        Name: "Nothing",
        Color: 'None',
        Description: "Literally nothing.",
        Extra: {},
        Quality: 100
    }),
    new Item_1.Item({
        Id: 1,
        CanonicalId: "honey",
        Name: "Honey",
        Color: 'Yellow',
        Description: "Sweet sugary Honey!",
        Extra: { heals: 10 }
    }),
    new Item_1.Item({
        Id: 2,
        CanonicalId: "milk",
        Name: "Milk",
        Color: 'White',
        Description: "Cowjuice!",
        Extra: { heals: 5 }
    }),
    new Item_1.Item({
        Id: 3,
        CanonicalId: "cheese",
        Name: "Cheese",
        Color: 'Yellow',
        Description: "Cowjuice(but solid)!",
        Extra: { heals: 10 }
    }),
    new Item_1.Item({
        Id: 4,
        CanonicalId: "stone",
        Name: "Stone",
        Color: 'None',
        Description: "A stone!",
        Extra: { crafting: true },
        BaseValue: 1
    }),
    new Item_1.Item({
        Id: 5,
        CanonicalId: "trash",
        Name: "Trash",
        Color: 'Black',
        Description: "Trash from the streets! Nice! and also worthless.",
        BaseValue: 1
    }),
]);
exports.BeeItemDB = beedb;
//# sourceMappingURL=itemdb.js.map