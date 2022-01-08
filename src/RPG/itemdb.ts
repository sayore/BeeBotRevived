import { Item } from 'supernode/Game/Item';
import { ItemDB } from 'supernode/Game/ItemDB';

const beedb = new ItemDB([
    new Item({ Id: -1, CanonicalId: "money1", Name: "1 $", Color: 'Yellow', Description: "Random money lying on the floor!", Extra: { money: 1 } }),
    new Item({ Id: 0, CanonicalId: "nothing", Name: "Nothing", Color: 'None', Description: "Literally nothing.", Extra: {}, Quality: 100 }),
    new Item({ Id: 1, CanonicalId: "honey", Name: "Honey", Color: 'Yellow', Description: "Sweet sugary Honey!", Extra: { heals: 10 } }),
    new Item({ Id: 2, CanonicalId: "milk", Name: "Milk", Color: 'White', Description: "Cowjuice!", Extra: { heals: 5 } }),
    new Item({ Id: 3, CanonicalId: "cheese", Name: "Cheese", Color: 'Yellow', Description: "Cowjuice(but solid)!", Extra: { heals: 10 } }),
    new Item({ Id: 4, CanonicalId: "stone", Name: "Stone", Color: 'None', Description: "A stone!", Extra: { crafting: true }, BaseValue: 1 }),
    new Item({ Id: 5, CanonicalId: "trash", Name: "Trash", Color: 'Black', Description: "Trash from the streets! Nice! and also worthless.", BaseValue: 1 }),
    new Item({ Id: 6, CanonicalId: "wheat", Name: "Wheat", Color: 'Yellow', Description: "Could be bread one day!" }),
    new Item({ Id: 7, CanonicalId: "tomato", Name: "Tomato", Color: 'Red', Description: "Yum!", Extra: { heals: 5 } }),
    new Item({ Id: 8, CanonicalId: "cucumber", Name: "Cucumber", Color: 'Green', Description: "Snake-lite", Extra: { heals: 5 } }),
    new Item({ Id: 9, CanonicalId: "cabage", Name: "Cabage", Color: 'Green', Description: "Could be used for a delicious dish.", Extra: { heals: 5 } }),

]);

export let BeeItemDB = beedb; 