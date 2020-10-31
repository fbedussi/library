import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from '../../model/model'

const initialState: AuthState = {
	userId: 'pippo',
}

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	},
})

export default slice.reducer
