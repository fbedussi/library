import { sort, splitCode } from './search'

describe('split code', () => {
	test('aa12-b', () => {
		expect(splitCode('aa12-b')).toEqual(['aa', 12, '-b']);
	});

	test('aa12b-b', () => {
		expect(splitCode('aa12b-b')).toEqual(['aa', 12, 'b-b']);
	});

	test('12aab-b', () => {
		expect(splitCode('12aab-b')).toEqual([12, 'aab-b']);
	});
});

describe('sort', () => {
	test('2 strings', () => {
		expect(sort('ab', 'aa')).toEqual(1);
	});

	test('2 numbers', () => {
		expect(sort('1', '2')).toEqual(-1);
	});

	test('alfanumerical', () => {
		expect(sort('a3', 'a12')).toEqual(-1);
	});

	test('alfanumerical 2', () => {
		expect(sort('a3b', 'a3a')).toEqual(1);
	});

	test('alfanumerical 3', () => {
		expect(sort('a3-b', 'a3-a')).toEqual(1);
	});

	test('alfanumerical 4', () => {
		expect(sort('a3b-b', 'a3-b')).toEqual(1);
	});

	test('bad formatted codes', () => {
		expect(sort('12AA-b', 'BB34-c')).toEqual(0);
	});
});
