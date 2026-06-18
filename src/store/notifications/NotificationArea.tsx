import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TDispatch } from '../../model/types';
import notificationsActions from './actions';
import { selectNotifications } from './selectors';
import Close from '../../icons/Close';

const NotificationArea = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch: TDispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(({ _id }) => {
      document.getElementById(_id)?.showPopover();
    });
  }, [notifications]);

  return (
    <>
      {notifications.map(({ message, _id }) => (
        <div key={_id} popover="" id={_id} className="snackbar">
          <div>{message}</div>
          <button
            type="button"
            popoverTarget={_id}
            popoverTargetAction="hide"
            aria-label="close"
            data-testid="close-button"
            onClick={() =>
              dispatch(notificationsActions.removeNotification(_id))
            }
          >
            <Close />
          </button>
        </div>
      ))}
    </>
  );
};

export default NotificationArea;
