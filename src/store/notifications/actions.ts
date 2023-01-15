import { generateUID } from '../../libs/uuid';
import { Notification } from '../../model/model';
import { AppThunk } from '../../model/types';
import errorsActions from '../errors/actions';
import { selectNotification } from './selectors';
import { slice } from './slice';

const AUTOCLOSE_DELAY = 5000;

const addNotification =
  (notification: Omit<Notification, '_id'>): AppThunk =>
  dispatch => {
    const _id = generateUID();
    dispatch(slice.actions._addNotification({ _id, ...notification }));
    if (notification.autoClose) {
      setTimeout(() => {
        dispatch(slice.actions._removeNotification(_id));
      }, AUTOCLOSE_DELAY);
    }
  };

const removeNotification =
  (notificationId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const notification = selectNotification(notificationId)(state);
    notification?.errorId &&
      notification.errorType === 'ui' &&
      dispatch(errorsActions.removeUiError(notification.errorId));
    notification?.errorId &&
      notification.errorType === 'http' &&
      dispatch(errorsActions.removeHttpError(notification.errorId));

    dispatch(slice.actions._removeNotification(notificationId));
  };

const notificationsActions = {
  removeNotification,
  addNotification,
};

export default notificationsActions;
