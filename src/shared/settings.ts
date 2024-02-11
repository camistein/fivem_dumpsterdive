import LootItem from './lootItem';

export interface Color {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

export interface Translations {
	dumpsterdive: string;
	searching: string;
	recievedItem: string;
	recievedNoItem: string;
	notAllowedToLoot: string;
	alreadyLooted: string;
}

export interface TextStyle {
	font: number;
	scale: number;
	size: number;
	color: Color;
	textDropShadow: Color & {
		distance: number;
	};
}

export interface Rules {
	maxDumpstersPerRS: number;
	lootProbabilityPercent: number;
}

export default interface Settings {
	textStyle?: TextStyle;
	translations?: Translations;
	rules: Rules;
	items: LootItem[];
	dumpsterModels: string[];
}

export const getSettings = (resource: string): Settings | null => {
	try {
		const file = LoadResourceFile(resource, 'config/config.json');
		return JSON.parse(file) as Settings;
	} catch (err) {
		console.error(err);
		return null;
	}
};
