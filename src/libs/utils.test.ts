import history from '../history'
import { genCharArray, handleUrlQuery, isSearchKey, isSortingOrder } from './utils'

test('genCharArray', () => {
	expect(genCharArray('a', 'f')).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
});

test('isSearchKey', () => {
	expect(isSearchKey('author')).toBe(true);
	expect(isSearchKey('author2')).toBe(false);
});

test('isSortingOrder', () => {
	expect(isSortingOrder('asc')).toBe(true);
	expect(isSortingOrder('asc2')).toBe(false);
});

test('handleUrlQuery', () => {
	history.push = jest.fn();
	handleUrlQuery({ author: 'foo', title: 'baz' });
	expect(history.push).toBeCalledWith({ search: 'author=foo&title=baz' });
});
