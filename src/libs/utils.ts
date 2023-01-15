import { SearchCriteria, SortingOrder } from '../model/model';

export const genCharArray = (firstChar: string, lastChar: string) => {
	let arr = [];
	let currentCharCode = firstChar.charCodeAt(0);
	const lastCharCode = lastChar.charCodeAt(0);
	for (; currentCharCode <= lastCharCode; ++currentCharCode) {
		arr.push(String.fromCharCode(currentCharCode));
	}
	return arr;
};

export const isSearchKey = (
	key: string | null,
): key is keyof SearchCriteria => {
	const searchCriteriaKeys: (keyof SearchCriteria)[] = [
		'author',
		'title',
		'location',
		'showOnlyNotRead',
	];
	return searchCriteriaKeys.includes(key as keyof SearchCriteria);
};

export const isSortingOrder = (order: string | null): order is SortingOrder => {
	const searchCriteriaKeys: SortingOrder[] = ['asc', 'desc'];
	return searchCriteriaKeys.includes(order as SortingOrder);
};
