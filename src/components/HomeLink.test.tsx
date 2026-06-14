import React from 'react';
import * as router from 'react-router-dom';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import HomeLink from './HomeLink';

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal() as any),
  useNavigate: vi.fn(),
}));

beforeEach(async () => {
  const actual = await vi.importActual<typeof router>('react-router-dom');
  (router.useNavigate as any).mockImplementation(actual.useNavigate);
});

test('triggers history.push on click', async () => {
  const user = userEvent.setup();

  const mockedNavigate = vi.fn();
  (router.useNavigate as any).mockReturnValue(mockedNavigate);

  render(<HomeLink />);
  await user.click(screen.getByRole('button'));
  expect(mockedNavigate).toBeCalledWith('/');
});
