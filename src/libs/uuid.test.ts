import { generateUID } from './uuid';

test('generateUID generates different IDs', () => {
  expect(generateUID()).not.toBe(generateUID());
});
