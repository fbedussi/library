import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	currentPhotoPath: '',
	words: [] as string[],
};

export const slice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
		_setCurrentPhotoPath: (state, { payload }: PayloadAction<string>) => {
			state.currentPhotoPath = payload;
		},
		_setWords: (state, { payload }: PayloadAction<string[]>) => {
			state.words = payload;
		},
	},
});

export default slice.reducer;
