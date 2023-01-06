import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { TDispatch } from '../../model/types'
import { IconButton, Snackbar } from '../../styleguide'
import { Close } from '../../styleguide/icons'
import notificationsActions from './actions'
import { selectNotifications } from './selectors'

const NotificationArea = () => {
	const { t } = useTranslation();
	const notifications = useSelector(selectNotifications);
	const dispatch: TDispatch = useDispatch();
	return (
		<>
			{notifications.map(({ message, messageIsLabelKey, _id }) => (
				<Snackbar
					key={_id}
					open={true}
					message={messageIsLabelKey ? t(message) : message}
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								data-testid="close-button"
								color="inherit"
								onClick={() =>
									dispatch(notificationsActions.removeNotification(_id))
								}
							>
								<Close />
							</IconButton>
						</React.Fragment>
					}
				/>
			))}
		</>
	);
};

export default NotificationArea;
