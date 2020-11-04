import { firebaseLogin } from '../../firebase'
import history from '../../history'
import { AppThunk } from '../../model/types'
import { persistUserId } from '../../persistance'
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

const authActions = {
	...slice.actions,
	login,
};

export default authActions;
