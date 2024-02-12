import { describe, expect, test } from '@jest/globals';
import { retrieveLoot } from './lootUtilities';

const testLoot = [
    {
        id: 'cash',
        label: 'money',
        chance: 50,
        amount: 10,
        type: 'cash'
    },
    {
        id: 'oxy',
        label: 'oxy',
        chance: 50,
        amount: 1,
        type: 'item'
    }
]

describe('retrieveLoot', () => {
  test('lootProbability 100 always recieves loot', () => {
    const loot = retrieveLoot(testLoot, { lootProbabilityPercent: 100, maxDumpstersPerRS: 0 });
    expect(loot).not.toBe(null);
    expect(loot?.amount as number).not.toBe(null);
    expect(loot?.amount as number).toBeGreaterThan(0);
    expect(loot?.id === 'oxy' || loot?.id === 'cash').toBeTruthy();
  });
  test('lootProbability 50 sometimes recieves loot', () => {
    const loot = retrieveLoot(testLoot, { lootProbabilityPercent: 50, maxDumpstersPerRS: 0 });
    expect(loot === null || (typeof loot === 'object' && !!loot.amount)).toBeTruthy();
    if(!!loot) {
        expect(loot?.id === 'oxy' || loot?.id === 'cash').toBeTruthy();
        expect(loot?.amount as number).toBeGreaterThan(0);
    }
  });
  test('lootProbability 0 doesnt recieves loot', () => {
    const loot = retrieveLoot(testLoot, { lootProbabilityPercent: 0, maxDumpstersPerRS: 0 });
    expect(loot).toBeNull();
  });
});