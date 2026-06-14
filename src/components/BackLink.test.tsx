import userEvent from '@testing-library/user-event';
import * as router from 'react-router';

import { render, screen } from '../test-utils';
import BackLink from './BackLink';

vi.mock('react-router', async importOriginal => ({
  ...(await importOriginal()),
  useNavigate: vi.fn(),
}));

beforeEach(async () => {
  const actual = await vi.importActual<typeof router>('react-router');
  vi.mocked(router.useNavigate).mockImplementation(actual.useNavigate);
});

test('triggers history.push on click', async () => {
  const user = userEvent.setup();
  const mockedNavigate = vi.fn();
  vi.mocked(router.useNavigate).mockReturnValue(mockedNavigate);
  render(<BackLink />);
  await user.click(screen.getByRole('button'));
  expect(mockedNavigate).toBeCalledWith(-1);
});
