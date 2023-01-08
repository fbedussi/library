import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../test-utils'
import LoginPage from './LoginPage'

jest.mock('../store/auth/actions', () => {
	return {
		login: (x: any) => ({ ...x, type: 'login' }),
	};
});

test('renders', () => {
	const page = render(<LoginPage />);
	expect(page).toMatchSnapshot();
});

test('submits', async () => {
	render(<LoginPage />);
	userEvent.type(screen.getByLabelText(/app.username/), 'foo');
	userEvent.type(screen.getByLabelText(/app.password/), 'baz');
	userEvent.click(screen.getByLabelText(/app.rememberMe/));
	userEvent.click(screen.getByRole('button', { name: /app.login/ }));
	await waitFor(() => {
		expect(mockDispatch).toBeCalledWith({
			username: 'foo',
			password: 'baz',
			rememberMe: true,
			type: 'login',
		});
	});
});
