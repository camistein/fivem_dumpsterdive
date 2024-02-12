/* If you wish to implement your own custom bypass of adding items & money the you can define a custom framework here
with the following information. 
{
    name: string
    enabled: boolean
    addItem: (playerId:number, loot: LootItem)
    addMoney: (playerId:number, loot: LootItem)
}

LootItem contains the following properties:
{
	id: string;
	label: string;
	amount: number | number[];
	type: string;
	attributes?: Attributes; 
	chance: number;
	[key: string]: number | string | any | null;
}

Attributes 
{
	[key: string]: string | number | any | null;
}

*/

const CustomFramework = {
	enabled: false,
};

module.exports = CustomFramework;
