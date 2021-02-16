import { generateUID } from './uuid'

describe('generateUID', () => {
	it('generates different IDs', () => {
		expect(generateUID()).not.toBe(generateUID());
	});
});
