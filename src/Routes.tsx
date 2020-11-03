import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import history from './history'
import AddBookPage from './pages/AddBookPage'
import EditBookPage from './pages/EditBookPage'
import SearchPage from './pages/SearchPage'
import booksActions from './store/books/actions'

const Routes = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(booksActions.load());
	}, [dispatch]);

	return (
		<Router history={history}>
			<Switch>
				<Route path="/add">
					<AddBookPage />
				</Route>
				<Route path="/edit/:bookId">
					<EditBookPage />
				</Route>
				<Route path="/">
					<SearchPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
