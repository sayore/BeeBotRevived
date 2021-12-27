import { Item } from 'supernode/Game/Item';
import { ItemDB } from 'supernode/Game/ItemDB';

let beedb = new ItemDB([
    new Item({
        Id:0,
        CanonicalId:"nothing",
        Name:"Nothing",
        Color:'None',
        Description:"Literally nothing."
    }),
    new Item({
        Id:1,
        CanonicalId:"honey",
        Name:"Honey",
        Color:'Yellow',
        Description:"Sweet sugary Honey!"
    }),
    new Item({
        Id:2,
        CanonicalId:"milk",
        Name:"Milk",
        Color:'White',
        Description:"Cowjuice!"
    }),
    new Item({
        Id:3,
        CanonicalId:"cheese",
        Name:"Cheese",
        Color:'Yellow',
        Description:"Cowjuice(but solid)!",
        Extra: {heals:10}
    })
]);

export let BeeItemDB = beedb;