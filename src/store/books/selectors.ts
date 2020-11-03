import { Id, RootState } from '../../model/model'

export const selectBooks = (state: RootState) => state.books;

export const selectBook = (bookId: Id) => (state: RootState) =>
	state.books.find(({ id }) => id === bookId);
