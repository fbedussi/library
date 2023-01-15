import React from 'react';
import * as router from 'react-router-dom';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import BackLink from './BackLink';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  (router.useNavigate as any).mockImplementation(
    jest.requireActual('react-router-dom').useNavigate,
  );
});

test('triggers history.push on click', async () => {
  const user = userEvent.setup();
  const mockedNavigate = jest.fn();
  (router.useNavigate as any).mockReturnValue(mockedNavigate);
  render(<BackLink />);
  await user.click(screen.getByRole('button'));
  expect(mockedNavigate).toBeCalledWith(-1);
});
