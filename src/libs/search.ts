import Fuse from 'fuse.js';

import { Book, SearchCriteria } from '../model/model';

const options = {
	keys: ['title', 'author', 'location'],
	includeScore: true,
	useExtendedSearch: true,
};

let fuse: Fuse<Book> | undefined;

export const initSearch = (books: Book[]) => {
	const index = Fuse.createIndex(options.keys, books);
	fuse = new Fuse(books, options, index);
};

export const search = ({ author, title, location }: SearchCriteria) => {
	// TODO: why is not a { [field: string]: string }[]
	const query: any[] = [{ author }, { title }, { location }]
		.filter(obj => Object.values(obj).every(value => value))
		.map(field =>
			Object.keys(field)[0] === 'location'
				? { location: `^${field.location}` }
				: field,
		);
	console.log(query);
	const result = fuse?.search({
		$and: query,
	});
	return result;
};

export const splitCode = (code: string): (string | number)[] => {
	let parts: (string | number)[] = [];
	while (code.length) {
		const match = code.match(/[^\d]+|\d+/);
		if (!match) {
			throw new Error('Invalid code');
		}
		const isNumber = Boolean(match[0].match(/\d+/));
		parts.push(isNumber ? parseInt(match[0]) : match[0]);
		code = code.substring(match[0].length);
	}
	return parts;
};

export const sort = (cod1: string, cod2: string): number => {
	const parts1 = splitCode(cod1);
	const parts2 = splitCode(cod2);
	const firstDifferentPartIndex = parts1.findIndex(
		(part, index) => part !== parts2[index],
	);

	if (
		typeof parts1[firstDifferentPartIndex] !==
		typeof parts2[firstDifferentPartIndex]
	) {
		// throw new Error('Codes have a different pattern');
		return 0;
	}

	const a = parts1[firstDifferentPartIndex];
	const b = parts2[firstDifferentPartIndex];
	return a < b ? -1 : a === b ? 0 : 1;
};
