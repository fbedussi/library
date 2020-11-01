import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from '../../model/model'

const initialState: AuthState = {
	userId: 'JaYQ9PxVOCUPiRWvArLANZUljor2',
}

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	},
})

export default slice.reducer
