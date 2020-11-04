export const persistUserId = (userId: string) => {
	window.localStorage.setItem('library-userId', userId);
};

export const getPersistedtUserId = () =>
	window.localStorage.getItem('library-userId');

export const deletePersistedtUserId = () =>
	window.localStorage.removeItem('library-userId');
