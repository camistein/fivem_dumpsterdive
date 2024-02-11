
// {
//     "id":"",
//     "label": "",
//     "amount": 1,
//     "ammo": {
//         "id": "",
//         "amount": 1
//     },
//     "chance": 0.25,
//     "attributes": {}
// }

export default interface LootItem {
    id: string,
    label: string,
    amount: number | number[],
    type: string,
    attributes?:Attributes
    chance: number,
    [key:string]: number|string|any|null

}

export interface Attributes {
    [key:string]: string|number|any|null
}

export interface Ammo {
    id: string,
    amount:number 
}

export interface LootTable {
    items: LootItem[]
}