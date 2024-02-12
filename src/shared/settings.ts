import { getJsonResourceFile } from './fileUtilities';
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
	enabled: boolean;
}

export const getSettings = (resource: string): Settings | null => {
	try {
		return getJsonResourceFile<Settings>(resource, 'config/config.json');
	} catch (err) {
		console.error(err);
		return null;
	}
};
