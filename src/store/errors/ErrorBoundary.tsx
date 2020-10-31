import React, { PropsWithChildren, Suspense } from 'react'
import { connect } from 'react-redux'

import { HttpError, Notification, RootState, UiError } from '../../model/model'
import { TDispatch } from '../../model/types'
import ErrorPage from '../../pages/ErrorPage'
import { CircularProgress } from '../../styleguide'
import notificationsActions from '../notifications/actions'
import errorsActions from './actions'
import { selectHttpErrors, selectUiErrors } from './selectors'

interface Props {
	setHttpError: (error: HttpError) => void
	setUiError: (error: Error) => void
	addNotification: (notification: Omit<Notification, '_id'>) => void
	httpErrors: HttpError[]
	uiErrors: UiError[]
}

class ErrorBoundary extends React.Component<PropsWithChildren<Props>> {
	componentDidCatch(error: Error | HttpError) {
		const { setHttpError, setUiError } = this.props
		return 'status' in error ? setHttpError(error) : setUiError(error)
	}

	render() {
		const { httpErrors, uiErrors } = this.props

		if (
			(!uiErrors.length && !httpErrors.length)
		) {
			return this.props.children
		} else {
			return (
				<Suspense fallback={<CircularProgress />}>
					<ErrorPage />
				</Suspense>
			)
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	httpErrors: selectHttpErrors(state),
	uiErrors: selectUiErrors(state),
})

const mapDispatchToProps = (dispatch: TDispatch) => ({
	setHttpError: (error: HttpError) =>
		dispatch(errorsActions.setHttpError(error)),
	setUiError: (error: Error) => dispatch(errorsActions.setUiError(error)),
	addNotification: (notification: Omit<Notification, '_id'>) =>
		dispatch(notificationsActions.addNotification(notification)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
