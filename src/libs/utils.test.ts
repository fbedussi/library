import history from '../history'
import { genCharArray, handleUrlQuery, isSearchKey, isSortingOrder } from './utils'

describe('genCharArray', () => {
	it('works', () => {
		expect(genCharArray('a', 'f')).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
	});
});

describe('isSearchKey', () => {
	it('works', () => {
		expect(isSearchKey('author')).toBe(true);
		expect(isSearchKey('author2')).toBe(false);
	});
});

describe('isSortingOrder', () => {
	it('works', () => {
		expect(isSortingOrder('asc')).toBe(true);
		expect(isSortingOrder('asc2')).toBe(false);
	});
});

describe('handleUrlQuery', () => {
	history.push = jest.fn();
	it('works', () => {
		handleUrlQuery({ author: 'foo', title: 'baz' });
		expect(history.push).toBeCalledWith({ search: 'author=foo&title=baz' });
	});
});
