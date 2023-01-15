import React from 'react';

import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../test-utils';
import Word from './Word';

test('does the selection', async () => {
  const user = userEvent.setup();

  const onClickCb = jest.fn();
  const word = 'word';
  render(<Word word={word} onClick={onClickCb} />);

  const el = screen.getByTestId('word');
  expect(el).toBeInTheDocument();
  await user.click(el);
  await waitFor(() => {
    expect(onClickCb).toBeCalled();
    expect(el.className.includes('clicked')).toBe(true);
  });
});
