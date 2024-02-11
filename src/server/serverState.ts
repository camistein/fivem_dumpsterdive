import Settings from "../shared/settings"

export interface ServerState {
    settings: Settings| null
    lootedDumpstersPerCharacter: DumpsterLootTable
}

export const defaultState:ServerState  = {
    settings: null as Settings | null,
    lootedDumpstersPerCharacter: {} as DumpsterLootTable
}

export interface DumpsterLootTable {
    [key:string]: LootedDumpster[]
}

export interface LootedDumpster {
    uniqueId: string
}