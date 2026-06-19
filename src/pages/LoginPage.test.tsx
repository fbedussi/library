import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../test-utils';
import LoginPage from './LoginPage';

vi.mock('../store/auth/actions', () => ({
  default: {
    login: (x: object) => ({ ...x, type: 'login' }),
  },
}));

test('renders', () => {
  const page = render(<LoginPage />);
  expect(page).toMatchSnapshot();
});

test('submits', async () => {
  const user = userEvent.setup();

  const dispatch = vi.fn();

  render(<LoginPage />, { dispatch });

  await user.type(screen.getByLabelText(/nome utente/), 'foo');
  await user.type(screen.getByLabelText(/password/), 'baz');
  await user.click(screen.getByLabelText(/ricordami/));
  await user.click(screen.getByRole('button', { name: /accedi/ }));

  await waitFor(() => {});
  expect(dispatch).toBeCalledWith({
    username: 'foo',
    password: 'baz',
    rememberMe: true,
    type: 'login',
  });
});
