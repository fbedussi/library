import { configureStore } from '@reduxjs/toolkit'

import { RootState } from './model/model'
import auth from './store/auth/slice'
import books from './store/books/slice'
import errors from './store/errors/slice'
import notifications from './store/notifications/slice'

const reducer = {
	books,
	errors,
	notifications,
	auth,
}

export const getTestStore = (preloadedState: Partial<RootState>) =>
	configureStore({
		reducer,
		preloadedState,
	})

export default configureStore({
	reducer,
})
