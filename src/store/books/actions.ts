import {
  addBookInDB, deleteBookInDB, loadBooksFromDB,
  searchBooksInDB, updateBookInDB
} from '../../data'
import { initSearch } from '../../libs/search'
import { Book, Id } from '../../model/model'
import { AppThunk } from '../../model/types'
import { selectUserId } from '../auth/selectors'
import errorsActions from '../errors/actions'
import { selectBooks } from './selectors'
import { slice } from './slice'

const initSearchAction = (): AppThunk => (dispatch, getState) => {
	const updatedState = getState();
	const books = selectBooks(updatedState);
	initSearch(books);
};

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

const load = (): AppThunk => async (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	const handleUpdate = (books: Book[]) => {
		dispatch(slice.actions._loadBooks(books));
	};
	try {
		await loadBooksFromDB(handleUpdate, userId);
	} catch (e: any) {
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
	}
};

const add = (book: Omit<Book, 'id'>): AppThunk => async (
	dispatch,
	getState,
) => {
	const state = getState();
	const userId = selectUserId(state);
	try {
		const newBook = await addBookInDB(book, userId);
		dispatch(slice.actions._addBook(newBook));
	} catch (e: any) {
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
	}
};

const update = (book: Book): AppThunk => async (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	try {
		await updateBookInDB({ ...book, userId });
		dispatch(slice.actions._updateBook(book));
	} catch (e: any) {
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
	}
};

const remove = (id: Id): AppThunk => async (dispatch, getState) => {
	try {
		await deleteBookInDB(id);
		dispatch(slice.actions._removeBook(id));
	} catch (e: any) {
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
	}
};

const booksActions = {
	...slice.actions,
	search,
	load,
	add,
	remove,
	initSearchAction,
	update,
};

export default booksActions;
