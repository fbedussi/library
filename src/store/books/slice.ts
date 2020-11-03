import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Book, Id } from '../../model/model'

const initialState: Book[] = [];

export const slice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		_loadBooks: (_, { payload }: PayloadAction<Book[]>) => payload,
		_addBook: (state, { payload }: PayloadAction<Book>) => {
			state.push(payload);
		},
		_removeBook: (state, { payload }: PayloadAction<Id>) => state.filter(({ id }) => id !== payload),
		_updateBook: (state, { payload }: PayloadAction<Book>) => state.map((book) => book.id === payload.id ? payload : book),
	},
});

export default slice.reducer;
