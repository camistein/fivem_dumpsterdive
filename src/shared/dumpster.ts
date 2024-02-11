import Coords from './coords';

export default interface Dumpster {
	id: number;
	uniqueId: string;
	model: string;
	hashKey: number;
	coords: Coords;
}
