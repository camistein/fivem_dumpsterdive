import { displayText, generateUniqueId } from './stringUtilites';
import Coords from '../shared/coords';
import Player from './player';
import Dumpster from '../shared/dumpster';
import { getSettings } from '../shared/settings';
import { defaultState } from './rootState';

const state = defaultState;

const isClose = (a: Coords, b: Coords): boolean => {
	return GetDistanceBetweenCoords(a.x, a.y, a.z, b.x, b.y, b.z, true) <= 2.0;
};

const getPlayer = (): Player => {
	const playerPed = GetPlayerPed(-1);
	const [x, y, z] = GetEntityCoords(playerPed, true);

	return {
		id: playerPed,
		coords: {
			x,
			y,
			z,
		},
		nearDumpster: false,
	};
};

const getClosestDumpster = (
	modelName: string,
	player: Player,
): Dumpster | null => {
	const hash = GetHashKey(modelName);
	const dumpster = GetClosestObjectOfType(
		player.coords.x,
		player.coords.y,
		player.coords.z,
		1.0,
		hash,
		false,
		true,
		true,
	);
	if (DoesEntityExist(dumpster)) {
		player.nearDumpster = true;
		const coords = GetEntityCoords(dumpster, true);
		return {
			hashKey: hash,
			id: dumpster,
			model: modelName,
			coords: {
				x: coords[0],
				y: coords[1],
				z: coords[2],
			},
			uniqueId: generateUniqueId(dumpster, coords[0], coords[1]),
		};
	}

	return null;
};

on('onResourceStart', (resName: string) => {
	if (resName === GetCurrentResourceName()) {
		console.log(GetCurrentResourceName() + ' started! Retrieving settings');
		state.settings = getSettings(GetCurrentResourceName());
		if (state.settings == null) {
			console.log('config.json missing');
		}
	}
	state.player = getPlayer();
	resetState();
});

setTick(() => {
	if (state.settings !== null) {
		Wait(3000);
		if (!!state.player) {
			const [x, y, z] = GetEntityCoords(state.player.id, true);
			state.player.coords = {
				x,
				y,
				z,
			};
		} else {
			state.player = getPlayer();
		}

		if (!!state.player && state.player !== null && state.player) {
			if (!state.player.nearDumpster) {
				state.settings.dumpsterModels.forEach((dumpModel) => {
					if (!!state.player && state.player !== null) {
						const foundDumpster = getClosestDumpster(dumpModel, state.player);
						if (
							!!foundDumpster &&
							foundDumpster != null &&
							isClose(state.player.coords, foundDumpster.coords)
						) {
							state.player.nearDumpster = true;
							state.currentDumpster = foundDumpster;
						}
					}
				});
			} else {
				if (!!state.currentDumpster && state.currentDumpster !== null) {
					if (
						!DoesEntityExist(state.currentDumpster.id) ||
						!isClose(state.player.coords, state.currentDumpster.coords)
					) {
						resetState();
					} else {
						if (!state.searching) {
							displayText(
								`${state.settings.translations?.dumpsterdive ?? 'Dumpsterdive'}`,
								state.currentDumpster.coords,
								state.settings,
							);
						}
						initDumpsterDive();
					}
				}
			}
		}
	}
});

const initDumpsterDive = () => {
	if (state.currentDumpster != null && state.player !== null) {
		Wait(3000);
		if (!IsEntityDead(GetPlayerPed(-1))) {
			if (IsControlJustPressed(0, 23) || IsControlJustPressed(0, 38)) {
				if (!state.searching) {
					state.searching = true;
					FreezeEntityPosition(state.player.id, true);
					TaskStartScenarioInPlace(
						state.player.id,
						'PROP_HUMAN_BUM_BIN',
						0,
						true,
					);
					SendNUIMessage({
						action: 'dv_progressbar_open',
						duration: 10000,
						label: state.settings?.translations?.searching,
					});
				}
			}

			if (IsControlJustPressed(0, 202)) {
				closeDumpsterDive();
			}
		} else {
			closeDumpsterDive();
		}
	}
};

const resetState = () => {
	state.currentDumpster = null;
	state.searching = false;
	if (state.player != null) {
		FreezeEntityPosition(state.player.id, false);
		ClearPedTasks(state.player.id);
		state.player.nearDumpster = false;
	}
};

const closeDumpsterDive = () => {
	SendNUIMessage({
		action: 'dv_progressbar_close',
	});
	resetState();
};

RegisterNuiCallbackType('dumpsterdive:Finished');

on('__cfx_nui:dumpsterdive:Finished', (data: any, cb: (data: any) => void) => {
	if (!!state.currentDumpster && state.currentDumpster !== null) {
		emitNet('dumpsterdive:RecieveLoot', GetPlayerPed(-1), {
			dumpster: state.currentDumpster.uniqueId,
		});
	}
	closeDumpsterDive();
	cb('ok');
});

onNet('dumpsterdive:RecievedLoot', (data: any) => {
	let itemInfo = `${!!data?.item ? '<span class="dv-notify-item">' : ''}${(data?.item?.amount ?? 0) > 1 ? data.item.amount : 1} ${!!data.item ? `${data.item.label}</span>` : ''}`;
	let message = `<p>${data.item !== null ? state.settings?.translations?.recievedItem : state.settings?.translations?.recievedNoItem} ${itemInfo}</p>`;
	SendNUIMessage({
		action: 'dv_notify_open',
		text: message,
	});
});

onNet('dumpsterdive:AlreadyLooted', () => {
	SendNUIMessage({
		action: 'dv_notify_open',
		text: state.settings?.translations?.alreadyLooted,
	});
});

onNet('dumpsterdive:NotAllowed', () => {
	SendNUIMessage({
		action: 'dv_notify_open',
		text: state.settings?.translations?.notAllowedToLoot,
	});
});
