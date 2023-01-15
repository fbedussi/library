import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Id, Notification } from '../../model/model';

const initialState: Notification[] = [];

export const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    _addNotification: (state, { payload }: PayloadAction<Notification>) =>
      state.filter(({ _id }) => _id !== payload._id).concat(payload),
    _removeNotification: (state, { payload }: PayloadAction<Id>) =>
      state.filter(notification => notification._id !== payload),
  },
});

export default slice.reducer;
