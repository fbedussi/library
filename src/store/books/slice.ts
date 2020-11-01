import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Book } from '../../model/model'

const initialState: Book[] = [];

export const slice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		_loadBooks: (_, { payload }: PayloadAction<Book[]>) => payload,
	},
});

export default slice.reducer;
