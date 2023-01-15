import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateUID } from '../../libs/uuid';
import { BeError, Errors, UiError } from '../../model/model';

const initialState: Errors = {
  http: [],
  ui: [],
};

export const slice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setHttpError: (state, { payload }: PayloadAction<BeError>) => {
      state.http.push({
        id: generateUID(),
        ...payload,
      });
    },
    removeHttpError: (state, { payload }: PayloadAction<string>) => {
      state.http = state.http.filter(({ id }) => id !== payload);
    },
    resetHttpError: state => {
      state.http = [];
    },
    setUiError: (state, { payload }: PayloadAction<UiError>) => {
      state.ui.push({
        id: generateUID(),
        message: payload.message || 'Unexpected error',
        stack: payload.stack || '',
      });
    },
    removeUiError: (state, { payload }: PayloadAction<string>) => {
      state.ui = state.ui.filter(({ id }) => id !== payload);
    },
    resetUiError: state => {
      state.ui = [];
    },
  },
});

export default slice.reducer;
