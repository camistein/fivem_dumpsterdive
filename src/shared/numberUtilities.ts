export const randomNumberInRange = (max: number, min: number): number => {
	return Math.floor(Math.random() * (min - max + 1)) + max;
};
