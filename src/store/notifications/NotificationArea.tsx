import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TDispatch } from '../../model/types';
import { IconButton, Snackbar } from '../../styleguide';
import { Close } from '../../styleguide/icons';
import notificationsActions from './actions';
import { selectNotifications } from './selectors';

const NotificationArea = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch: TDispatch = useDispatch();
  return (
    <>
      {notifications.map(({ message, _id }) => (
        <Snackbar
          key={_id}
          open={true}
          message={message}
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
