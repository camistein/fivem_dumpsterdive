export default interface LootItem {
	id: string;
	label: string;
	amount: number | number[];
	type: string;
	attributes?: Attributes;
	chance: number;
	[key: string]: number | string | any | null;
}

export interface Attributes {
	[key: string]: string | number | any | null;
}
