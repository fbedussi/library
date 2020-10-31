import { RootState } from '../../model/model'

export const selectNotifications = (state: RootState) => state.notifications

export const selectNotification = (id: string) => (state: RootState) =>
	state.notifications.find(notification => notification._id === id)
