import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { TDispatch } from '../../model/types';
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
          }
        />
      ))}
    </>
  );
};

export default NotificationArea;
