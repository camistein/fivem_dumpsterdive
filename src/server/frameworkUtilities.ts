import { getFile } from '../shared/fileUtilities';
import LootItem from '../shared/lootItem';

export interface Framework {
	name: string;
	export?: any;
	enabled: boolean;
	addItem: (playerId: number, loot: LootItem) => void;
	addMoney: (playerId: number, loot: LootItem) => void;
}

export class FivemFramework implements Framework {
	name: string;
	export?: any;
	enabled: boolean;
	addItem: (playerId: number, loot: LootItem) => void;
	addMoney: (playerId: number, loot: LootItem) => void;

	constructor(
		_name: string,
		_addItem: (playerId: number, loot: LootItem) => void,
		_addMoney: (playerId: number, loot: LootItem) => void,
		_export?: any,
		_enabled: boolean = true,
	) {
		this.enabled = _enabled;
		this.name = _name;
		if (!!_export) {
			this.export = _export;
		}
		this.addItem = _addItem;
		this.addMoney = _addMoney;
	}
}

const coreAddItem = function (
	this: FivemFramework,
	playerId: number,
	loot: LootItem,
) {
	if (!!this?.export?.Functions) {
		const qbPlayer = this?.export?.Functions?.GetPlayer(playerId);
		qbPlayer.Functions.AddItem(loot.id, loot.amount);
	}
};

const coreAddMoney = function (
	this: FivemFramework,
	playerId: number,
	loot: LootItem,
) {
	if (!!this?.export?.Functions) {
		const qbPlayer = this?.export?.Functions?.GetPlayer(playerId);
		qbPlayer?.Functions.AddMoney('cash', loot.amount, 'dumpsterdiving');
	}
};

const esxAddItem = function (
	this: FivemFramework,
	playerId: number,
	loot: LootItem,
) {
	if (!!this?.export?.GetPlayerFromId) {
		const xPlayer = this.export.GetPlayerFromId(playerId);
		xPlayer.setInventoryItem(loot.id, loot.amount);
	}
};

const esxAddMoney = function (
	this: FivemFramework,
	playerId: number,
	loot: LootItem,
) {
	if (!!this?.export?.GetPlayerFromId) {
		const xPlayer = this.export.GetPlayerFromId(playerId);
		xPlayer?.AddMoney(loot.amount);
	}
};

export const getFramework = async (
	resource: string,
): Promise<Framework | null> => {
	const { CustomFramework } = await getFile(
		GetResourcePath(resource),
		'/customFramework.js',
	);
	if (!!CustomFramework && CustomFramework.enabled) {
		return new FivemFramework(
			CustomFramework.name,
			CustomFramework.addItem,
			CustomFramework.addMoney,
			CustomFramework.export,
		);
	}

	if ((GetResourcePath('qb-core')?.length ?? 0) > 0) {
		if (!!global.exports['qb-core'].GetCoreObject) {
			return new FivemFramework(
				'QBCore',
				coreAddItem,
				coreAddMoney,
				global.exports['qb-core'].GetCoreObject(),
			);
		}
	}

	if ((GetResourcePath('es_extended')?.length ?? 0) > 0) {
		if (!!global.exports['es_extended'].getSharedObject) {
			return new FivemFramework(
				'ESX',
				esxAddItem,
				esxAddMoney,
				global.exports['es_extended'].getSharedObject(),
			);
		}
	}

	return null;
};
