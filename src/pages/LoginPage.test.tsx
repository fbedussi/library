import React from 'react'
import { act } from 'react-dom/test-utils'

import { fireEvent, screen, waitFor } from '@testing-library/react'

import { render } from '../test-utils'
import LoginPage from './LoginPage'

jest.mock('../store/auth/actions', () => {
	return {
		login: (x: any) => ({ ...x, type: 'login' }),
	};
});

describe('LoginPage', () => {
	it('redirects to search if userId is populated', () => {
		const page = render(<LoginPage />, {
			initialState: { auth: { userId: 'foo' } },
		});
		expect(page).toMatchSnapshot();
	});

	it('renders', () => {
		const page = render(<LoginPage />);
		expect(page).toMatchSnapshot();
	});

	it('submits', () => {
		const dispatch = jest.fn();
		render(<LoginPage />, { dispatch });
		act(() => {
			fireEvent.change(screen.getByLabelText(/app.username/), {
				target: { value: 'foo' },
			});
		});
		act(() => {
			fireEvent.change(screen.getByLabelText(/app.password/), {
				target: { value: 'baz' },
			});
		});
		act(() => {
			fireEvent.click(screen.getByLabelText(/app.rememberMe/));
		});
		waitFor(() => {
			expect(dispatch).toBeCalledWith({
				username: 'foo',
				password: 'baz',
				rememberMe: true,
			});
		});
	});
});
