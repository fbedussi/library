import { getBooksFromDB } from '../../data'
import { Book } from '../../model/model'
import { AppThunk } from '../../model/types'
import { selectUserId } from '../auth/selectors'
import { slice } from './slice'

const fetchBooks = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const userID = selectUserId(state);
	const handleUpdate = (books: Book[]) => {
		dispatch(slice.actions._loadBooks(books));
	};
	getBooksFromDB(handleUpdate, userID);
}


const booksActions = {
	...slice.actions,
	fetchBooks,
}

export default booksActions
