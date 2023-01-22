import { Action, ThunkAction } from '@reduxjs/toolkit';
import {
	addBookInDB,
	deleteBookInDB,
	loadBooksFromDB,
	searchBooksInDB,
	updateBookInDB,
} from '../../data';
import { initSearch } from '../../libs/search';
import { Book, Id, RootState } from '../../model/model';
import { AppThunk } from '../../model/types';
import { selectUserId } from '../auth/selectors';
import errorsActions from '../errors/actions';
import { selectBooks } from './selectors';
import { slice } from './slice';

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
		dispatch(initSearchAction());
	};
	try {
		await loadBooksFromDB(handleUpdate, userId);
	} catch (err) {
		const e: any = err;
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
	}
};

const add = (
	book: Omit<Book, 'id'>,
): ThunkAction<
	Promise<Book | null>,
	RootState,
	unknown,
	Action<string>
> => async (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	try {
		const newBook = await addBookInDB(book, userId);
		dispatch(slice.actions._addBook(newBook));
		dispatch(initSearchAction());
		return newBook;
	} catch (err) {
		const e: any = err;
		dispatch(
			errorsActions.setHttpError({
				message: e.message,
				origin: 'db',
			}),
		);
		return null;
	}
};

const update = (book: Book): AppThunk => async (dispatch, getState) => {
	const state = getState();
	const userId = selectUserId(state);
	try {
		await updateBookInDB({ ...book, userId });
		dispatch(slice.actions._updateBook(book));
		dispatch(initSearchAction());
	} catch (err) {
		const e: any = err;
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
		dispatch(initSearchAction());
	} catch (err) {
		const e: any = err;
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
