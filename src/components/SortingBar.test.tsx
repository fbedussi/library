import React from 'react';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../test-utils';
import SortingBar from './SortingBar';

const setSortingKey = jest.fn();
const setSortingOrder = jest.fn();

test('has all the controls', () => {
  render(
    <SortingBar
      sortingKey="author"
      sortingOrder="asc"
      setSortingOrder={setSortingOrder}
      setSortingKey={setSortingKey}
      foundNumber={2}
    />,
  );

  const authorRadio = screen.getByLabelText('app.author') as HTMLInputElement;
  expect(authorRadio).toBeInTheDocument();
  expect(authorRadio.checked).toBe(true);
  expect(screen.getByLabelText('app.title')).toBeInTheDocument();
  expect(screen.getByLabelText('app.locationShort')).toBeInTheDocument();
  expect(screen.getByTestId('sorting-btn')).toBeInTheDocument();
});

test('switch sorting order', async () => {
  const user = userEvent.setup();
  render(
    <SortingBar
      sortingKey="author"
      sortingOrder="asc"
      setSortingOrder={setSortingOrder}
      setSortingKey={setSortingKey}
      foundNumber={2}
    />,
  );
  await user.click(screen.getByTestId('sorting-btn'));
  expect(setSortingOrder).toBeCalledWith('desc');
});

test('change sorting key', async () => {
  const user = userEvent.setup();

  render(
    <SortingBar
      sortingKey="author"
      sortingOrder="asc"
      setSortingOrder={setSortingOrder}
      setSortingKey={setSortingKey}
      foundNumber={2}
    />,
  );

  await user.click(screen.getByLabelText('app.locationShort'));
  expect(setSortingKey).toBeCalledWith('location');
});
