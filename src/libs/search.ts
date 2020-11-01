import Fuse from 'fuse.js'

import { Book, SearchCriteria } from '../model/model'

const options = { keys: ['title', 'author', 'location'], includeScore: true };

let fuse: Fuse<Book> | undefined;

export const initSearch = (books: Book[]) => {
	const index = Fuse.createIndex(options.keys, books);
	fuse = new Fuse(books, options, index);
};

export const search = ({ author, title, location }: SearchCriteria) => {
	const query: any[] = [{ author }, { title }, { location }].filter(obj =>
		Object.values(obj).every(value => value),
	);
	const result = fuse?.search({
		$and: query,
	});
	return result;
};
