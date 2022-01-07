import { Item } from 'supernode/Game/Item';
import { ItemDB } from 'supernode/Game/ItemDB';

let beedb = new ItemDB([
    new Item({ Id: -1, CanonicalId: "money1", Name: "1 $", Color: 'Yellow', Description: "Random money lying on the floor!", Extra: { money: 1 } }),
    new Item({ Id: 0, CanonicalId: "nothing", Name: "Nothing", Color: 'None', Description: "Literally nothing.", Extra: {}, Quality: 100 }),
    new Item({ Id: 1, CanonicalId: "honey", Name: "Honey", Color: 'Yellow', Description: "Sweet sugary Honey!", Extra: { heals: 10 } }),
    new Item({ Id: 2, CanonicalId: "milk", Name: "Milk", Color: 'White', Description: "Cowjuice!", Extra: { heals: 5 } }),
    new Item({ Id: 3, CanonicalId: "cheese", Name: "Cheese", Color: 'Yellow', Description: "Cowjuice(but solid)!", Extra: { heals: 10 } }),
    new Item({ Id: 4, CanonicalId: "stone", Name: "Stone", Color: 'None', Description: "A stone!", Extra: { crafting: true }, BaseValue: 1 }),
    new Item({ Id: 5, CanonicalId: "trash", Name: "Trash", Color: 'Black', Description: "Trash from the streets! Nice! and also worthless.", BaseValue: 1 }),

]);

export let BeeItemDB = beedb;