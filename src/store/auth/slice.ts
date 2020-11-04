import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from '../../model/model'
import { getPersistedtUserId } from '../../persistance'

const initialState: AuthState = {
	// userId: 'JaYQ9PxVOCUPiRWvArLANZUljor2',
	userId: getPersistedtUserId() || '',
};

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		_setUserId: (state, { payload }: PayloadAction<string>) => {
			state.userId = payload;
		},
	},
});

export default slice.reducer;
