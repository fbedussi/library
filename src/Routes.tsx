import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import history from './history'
import AddBookPage from './pages/AddBookPage'
import BooksPage from './pages/BooksPages'
import booksActions from './store/books/actions'

const Routes = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(booksActions.fetchBooks())
	}, [dispatch])

	return (
		<Router history={history}>
			<Switch>
				<Route path="/">
					<BooksPage />
				</Route>
				<Route path="/add">
					<AddBookPage />
				</Route>
			</Switch>
		</Router>
	)
}

export default Routes
