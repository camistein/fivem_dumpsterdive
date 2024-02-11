import Coords from "../shared/coords";

export default interface Player {
    id: number;
    coords:Coords
    nearDumpster: boolean
  }