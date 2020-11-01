import { loadBooksFromDB, searchBooksInDB } from '../../data'
import { initSearch } from '../../libs/search'
import { Book } from '../../model/model'
import { AppThunk } from '../../model/types'
import { selectUserId } from '../auth/selectors'
import { slice } from './slice'

const search = (searchCriteria: {
	author: string;
	title: string;
	location: string;
}): AppThunk => (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	const handleUpdate = (books: Book[]) => {
		dispatch(slice.actions._loadBooks(books));
	};
	searchBooksInDB(handleUpdate, { ...searchCriteria, userId });
};

const load = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	const handleUpdate = (books: Book[]) => {
		dispatch(slice.actions._loadBooks(books));
		initSearch(books);
	};
	loadBooksFromDB(handleUpdate, userId);
};

const booksActions = {
	...slice.actions,
	search,
	load,
};

export default booksActions;
