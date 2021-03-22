import React from 'react'
import { act } from 'react-dom/test-utils'

import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from '../test-utils'
import LoginPage from './LoginPage'

jest.mock('../store/auth/actions', () => {
	return {
		login: (x: any) => ({ ...x, type: 'login' }),
	};
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');
	return {
		...originalModule,
		useDispatch: () => mockDispatch,
	};
});

test('redirects to search if userId is populated', () => {
	const page = render(<LoginPage />, {
		initialState: { auth: { userId: 'foo' } },
	});
	expect(page).toMatchSnapshot();
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
