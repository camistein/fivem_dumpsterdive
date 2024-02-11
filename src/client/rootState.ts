import Dumpster from '../shared/dumpster';
import Player from './player';
import Settings from '../shared/settings';

export interface RootState {
	player: Player | null;
	currentDumpster: Dumpster | null;
	settings: Settings | null;
	searching: boolean;
}

export const defaultState: RootState = {
	player: null as Player | null,
	currentDumpster: null as Dumpster | null,
	settings: null as Settings | null,
	searching: false,
};
