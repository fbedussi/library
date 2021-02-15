import React from 'react';

import { fireEvent, render, screen } from '../../test-utils';
import NotificationArea from './NotificationArea';

jest.mock('./actions', () => {
	return {
		removeNotification: () => 'removeNotification',
	};
});

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: key => key }),
}));

test('Renders the notification', () => {
	render(<NotificationArea />, {
		initialState: {
			notifications: [
				{
					_id: '1',
					type: 'error',
					message: 'foo',
					autoClose: false,
				},
			],
		},
	});

	expect(screen.getByText('foo')).toBeTruthy();
	expect(screen.getByTestId('close-button')).toBeTruthy();
});

test('CloseButton', () => {
	const dispatch = jest.fn();
	render(<NotificationArea />, {
		dispatch,
		initialState: {
			notifications: [
				{
					_id: '1',
					type: 'error',
					message: 'foo',
					autoClose: false,
				},
			],
		},
	});
	fireEvent.click(screen.getByTestId('close-button'));
	expect(dispatch).toBeCalledWith('removeNotification');
});
