import { configureStore } from '@reduxjs/toolkit'

import { RootState } from './model/model'
import books from './store/books/slice'
import errors from './store/errors/slice'
import notifications from './store/notifications/slice'

const reducer = {
	books,
	errors,
	notifications,
}

export const getTestStore = (preloadedState: Partial<RootState>) =>
	configureStore({
		reducer,
		preloadedState,
	})

export default configureStore({
	reducer,
})
