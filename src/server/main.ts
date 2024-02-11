import { defaultState } from "./serverState";
import { getSettings } from "../shared/settings";
import {retrieveLoot} from "./lootUtilities"
import { getFramework } from "./frameworkUtilities";
import LootItem from "../shared/lootItem";

let ESX: any = null
let QBCore: any = null

const state = defaultState
on("onResourceStart", (resName: string) => {
  if (resName === GetCurrentResourceName()) {
    console.log("Dumsterdive:server started!");
    state.settings = getSettings(GetCurrentResourceName());
    
    const framework = getFramework();
    if(!!framework) {
      console.log(`Dumpsterdive:running on framework ${framework.name}`)
      if(framework.name === 'QBCore') {
        QBCore = framework.export;
      }
      else if(framework.name === 'ESX') {
        ESX = framework.export;
      }
    }
    if(state.settings == null) {
      console.log('config.json missing')
    }
  }
});

const checkLootedDumpsters = (player: number, dumpsterId?: string) => {
  if(state.lootedDumpstersPerCharacter[player] !== undefined) {
      return {
        total: state.lootedDumpstersPerCharacter[player].length,
        dumpsters: state.lootedDumpstersPerCharacter[player],
        lootedcurrent: state.lootedDumpstersPerCharacter[player].findIndex((dump) => dump.uniqueId === dumpsterId) > -1
      };
  }

  return {
    total: 0,
    dumpsters: [],
    lootedcurrent: false
  };
}

const addMoney = (loot: LootItem) => {
  if(!!QBCore?.Functions) {
    const qbPlayer = QBCore?.Functions?.GetPlayer(source)
    qbPlayer?.Functions.AddMoney('cash', loot.amount, 'dumpsterdiving')            
}

if(!!ESX && !!ESX?.GetPlayerFromId) {
  const xPlayer = ESX.GetPlayerFromId(source)
  xPlayer?.AddMoney(loot.amount)
}
}

const addItem = (loot: LootItem) => {
  if(!!QBCore?.Functions) {
    const qbPlayer = QBCore?.Functions?.GetPlayer(source)
    qbPlayer.Functions.AddItem(loot.id, loot.amount)
  }

  if(!!ESX?.GetPlayerFromId) {
    const xPlayer = ESX.GetPlayerFromId(source)
    xPlayer.setInventoryItem(loot.id,loot.amount)
  }
}

onNet('dumpsterdive:RecieveLoot', (data:any) => {
  if(!!state.settings && !!source && !!data) {
    const player = GetPlayerPed(source.toString());
    const dumpsterState = checkLootedDumpsters(player, data)
    if(dumpsterState.total < state.settings.rules.maxDumpstersPerRS) 
    { 
      if(!dumpsterState.lootedcurrent) {
        const loot = retrieveLoot(state.settings.items, state.settings.rules)
        emitNet("dumpsterdive:RecievedLoot",source,{ item: loot})
        if(!!loot) {
          if(loot.id === 'cash' || loot.id === 'cash' || loot.type === 'cash'  || loot.type === 'money') {
            addMoney(loot)
          }
          else {
            addItem(loot);
          }
        }
 
        if(!!data) {
           if(!!state.lootedDumpstersPerCharacter[player]) {
             state.lootedDumpstersPerCharacter[player].push({
               uniqueId: data
             })
           }
           else {
             state.lootedDumpstersPerCharacter[player] = []
           }
        }
      }
      else {
        emitNet("dumpsterdive:AlreadyLooted",source)
      }
    }
    else {
      emitNet("dumpsterdive:NotAllowed",source)
    }
  }
});