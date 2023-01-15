import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../test-utils';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';

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
  const user = userEvent.setup();

  const dispatch = jest.fn();

  render(<LoginPage />, { dispatch });

  await user.type(screen.getByLabelText(/app.username/), 'foo');
  await user.type(screen.getByLabelText(/app.password/), 'baz');
  await user.click(screen.getByLabelText(/app.rememberMe/));
  await user.click(screen.getByRole('button', { name: /app.login/ }));

  await waitFor(() => {});
  expect(dispatch).toBeCalledWith({
    username: 'foo',
    password: 'baz',
    rememberMe: true,
    type: 'login',
  });
});
