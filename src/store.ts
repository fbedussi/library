import { configureStore } from '@reduxjs/toolkit';
import type { ReducersMapObject, UnknownAction } from 'redux';

import { RootState } from './model/model';
import auth from './store/auth/slice';
import books from './store/books/slice';
import errors from './store/errors/slice';
import notifications from './store/notifications/slice';
import photos from './store/photos/slice';

const reducer = {
  books,
  photos,
  errors,
  notifications,
  auth,
} as ReducersMapObject<RootState, UnknownAction, Partial<RootState>>;

export const getTestStore = (preloadedState: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
  });

export default configureStore({
  reducer,
});
