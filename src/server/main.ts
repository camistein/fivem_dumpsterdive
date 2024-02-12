import { defaultState } from './serverState';
import { getSettings } from '../shared/settings';
import { retrieveLoot } from './lootUtilities';
import { Framework, getFramework } from './frameworkUtilities';
import LootItem from '../shared/lootItem';

let currentFramework: Framework | null = null;

const state = defaultState;
on('onResourceStart', (resName: string) => {
	if (resName === GetCurrentResourceName()) {
		console.log('Dumsterdive:server started!');
		state.settings = getSettings(GetCurrentResourceName());

		getFramework(GetCurrentResourceName()).then((framework) => {
			if (!!framework) {
				console.log(`Dumpsterdive:running on framework ${framework.name}`);
				currentFramework = framework;
			}
		});
		if (state.settings == null) {
			console.log('config.json missing');
		}
	}
});

const checkLootedDumpsters = (player: number, dumpsterId?: string) => {
	if (state.lootedDumpstersPerCharacter[player] !== undefined) {
		return {
			total: state.lootedDumpstersPerCharacter[player].length,
			dumpsters: state.lootedDumpstersPerCharacter[player],
			lootedcurrent:
				state.lootedDumpstersPerCharacter[player].findIndex(
					(dump) => dump.uniqueId === dumpsterId,
				) > -1,
		};
	}

	return {
		total: 0,
		dumpsters: [],
		lootedcurrent: false,
	};
};

const addMoney = (loot: LootItem) => {
	if (!!currentFramework) {
		currentFramework.addMoney(source, loot);
	}
};

const addItem = (loot: LootItem) => {
	if (!!currentFramework) {
		currentFramework.addItem(source, loot);
	}
};

onNet('dumpsterdive:RecieveLoot', (data: any) => {
	if (!!state.settings && !!source && !!data) {
		const player = GetPlayerPed(source.toString());
		const dumpsterState = checkLootedDumpsters(player, data);
		if (dumpsterState.total < state.settings.rules.maxDumpstersPerRS) {
			if (!dumpsterState.lootedcurrent) {
				const loot = retrieveLoot(state.settings.items, state.settings.rules);
				emitNet('dumpsterdive:RecievedLoot', source, { item: loot });
				if (!!loot) {
					if (
						loot.id === 'cash' ||
						loot.id === 'cash' ||
						loot.type === 'cash' ||
						loot.type === 'money'
					) {
						addMoney(loot);
					} else {
						addItem(loot);
					}
				}

				if (!!data) {
					if (!!state.lootedDumpstersPerCharacter[player]) {
						state.lootedDumpstersPerCharacter[player].push({
							uniqueId: data,
						});
					} else {
						state.lootedDumpstersPerCharacter[player] = [];
					}
				}
			} else {
				emitNet('dumpsterdive:AlreadyLooted', source);
			}
		} else {
			emitNet('dumpsterdive:NotAllowed', source);
		}
	}
});
