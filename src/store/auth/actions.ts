import { firebaseLogin, firebaseLogout } from '../../firebase'
import history from '../../history'
import { AppThunk } from '../../model/types'
import { deletePersistedtUserId, persistUserId } from '../../persistance'
import booksActions from '../books/actions'
import errorsActions from '../errors/actions'
import { slice } from './slice'

const login = ({
	username,
	password,
	rememberMe,
}: {
	username: string;
	password: string;
	rememberMe: boolean;
}): AppThunk => dispatch => {
	firebaseLogin(username, password)
		.then(({ user }) => {
			if (!user) {
				return dispatch(
					errorsActions.setHttpError({
						message: 'no user after login',
						origin: 'auth',
					}),
				);
			}

			dispatch(authActions._setUserId(user.uid));
			dispatch(booksActions.load());

			if (rememberMe) {
				persistUserId(user.uid);
			}
			history.push('/search');
		})
		.catch(error =>
			dispatch(
				errorsActions.setHttpError({
					message: error.message,
					origin: 'auth',
				}),
			),
		);
};

const logout = (): AppThunk => dispatch => {
	firebaseLogout().then(() => {
		deletePersistedtUserId();
		dispatch(booksActions._loadBooks([]));
		dispatch(booksActions.initSearchAction());
		dispatch(authActions._setUserId(''));
	});
};

const authActions = {
	...slice.actions,
	login,
	logout,
};

export default authActions;
