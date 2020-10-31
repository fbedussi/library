import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Book } from '../../model/model'

const initialState: Book[] = [{
	author: 'pippo',
	publisher: 'pluto',
	title: 'topolino',
	location: 'A3',
}]

export const slice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		_loadBooks: (_, { payload }: PayloadAction<Book[]>) => payload,
	},
})

export default slice.reducer
