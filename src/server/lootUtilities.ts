import LootItem from '../shared/lootItem';
import { Rules } from '../shared/settings';
import { randomNumberInRange } from '../shared/numberUtilities';

export const retrieveLoot = (
	loot: LootItem[],
	lootRules: Rules,
): LootItem | null => {
	if (lootRules.lootProbabilityPercent < 100) {
		const lootProbability = Math.random() * 100;

		if (lootProbability <= lootRules.lootProbabilityPercent) {
			return getLootItem(loot);
		}
	} else {
		return getLootItem(loot);
	}

	return null;
};

const shuffleLoot = (array: LootItem[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const getLootItem = (items: LootItem[]): LootItem | null => {
	const availableLoot = shuffleLoot(items);
	const totalW = availableLoot
		.map((item) => item.chance)
		.reduce((a, b) => a + b, 0);
	const lootPositions: number[] = [];

	availableLoot.forEach((item, index) => {
		for (var i = 0; i < item.chance; i++) {
			lootPositions.push(index);
		}
	});

	const roll = Math.floor(Math.random() * totalW);
	const lootIndex = lootPositions[roll];
	const loot = availableLoot[lootIndex];

	let amount = loot.amount;
	if (!!loot && Array.isArray(loot.amount)) {
		const randomAmount = randomNumberInRange(loot.amount[0], loot.amount[1]);
		amount = randomAmount;
	}

	return {
		...loot,
		amount: amount,
	};
};
