import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router'

import { selectUserId } from '../store/auth/selectors'

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	const userId = useSelector(selectUserId);

	return !userId ? <Redirect to="/" /> : <Route {...props}>{children}</Route>;
};

export default AuthenticatedRoute;
