import { describe, expect, test } from '@jest/globals';
import { generateUniqueId } from './stringUtilites';

describe('generateUniqueId', () => {
  test('unique Id doesnt include decimals', () => {
    expect(generateUniqueId(1.34534534, 222.9, -130.4568)).toBe("1_222_-131");
  });
});