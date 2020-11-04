import React, { PropsWithChildren, Suspense } from 'react'
import { connect } from 'react-redux'

import { BeError, Notification, RootState, UiError } from '../../model/model'
import { TDispatch } from '../../model/types'
import ErrorPage from '../../pages/ErrorPage'
import { CircularProgress } from '../../styleguide'
import notificationsActions from '../notifications/actions'
import errorsActions from './actions'
import { selectHttpErrors, selectUiErrors } from './selectors'

interface Props {
	setHttpError: (error: BeError) => void;
	setUiError: (error: UiError) => void;
	addNotification: (notification: Omit<Notification, '_id'>) => void;
	httpErrors: BeError[];
	uiErrors: UiError[];
}

class ErrorBoundary extends React.Component<PropsWithChildren<Props>> {
	componentDidCatch(error: Error) {
		const { setHttpError, setUiError } = this.props;
		return 'status' in error
			? setHttpError(error)
			: setUiError({ message: error.message, stack: error.stack });
	}

	render() {
		const { httpErrors, uiErrors } = this.props;

		if (!uiErrors.length && !httpErrors.length) {
			return this.props.children;
		} else {
			return (
				<Suspense fallback={<CircularProgress />}>
					<ErrorPage />
				</Suspense>
			);
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	httpErrors: selectHttpErrors(state),
	uiErrors: selectUiErrors(state),
});

const mapDispatchToProps = (dispatch: TDispatch) => ({
	setHttpError: (error: BeError) => dispatch(errorsActions.setHttpError(error)),
	setUiError: (error: UiError) => dispatch(errorsActions.setUiError(error)),
	addNotification: (notification: Omit<Notification, '_id'>) =>
		dispatch(notificationsActions.addNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
