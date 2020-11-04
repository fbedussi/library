import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import history from './history'
import AddBookPage from './pages/AddBookPage'
import EditBookPage from './pages/EditBookPage'
import LoginPage from './pages/LoginPage'
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
				<AuthenticatedRoute path="/add">
					<AddBookPage />
				</AuthenticatedRoute>
				<AuthenticatedRoute path="/edit/:bookId">
					<EditBookPage />
				</AuthenticatedRoute>
				<AuthenticatedRoute path="/search">
					<SearchPage />
				</AuthenticatedRoute>
				<Route path="/">
					<LoginPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
