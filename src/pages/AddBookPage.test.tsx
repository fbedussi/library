import React from 'react';

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import booksActions from '../store/books/actions';
import photosActions from '../store/photos/actions';
import { render, screen } from '../test-utils';
import AddBookPage from './AddBookPage';

jest.mock('../config', () => {
  return {
    firebase: {
      apiKey: 'apiKey',
      authDomain: 'authDomain',
      databaseURL: 'databaseURL',
      projectId: 'projectId',
      storageBucket: 'storageBucket',
      messagingSenderId: 'messagingSenderId',
      appId: 'appId',
    },
  };
});

booksActions.add = (x: any) => ({ ...x, type: 'add' });
photosActions.resetPhotoData = ((x: any) => ({
  ...x,
  type: 'photos/resetPhotoData',
})) as ActionCreatorWithoutPayload<'photos/resetPhotoData'>;

test('renders correctly', () => {
  const page = render(<AddBookPage />);
  expect(page).toMatchSnapshot();
});

test('no currentPhotoUrl', () => {
  render(<AddBookPage />);
  const cameraLink = screen.getByRole<HTMLAnchorElement>('link', {
    name: /app.takePhoto/i,
  });
  expect(cameraLink).toBeInTheDocument();
  expect(!!cameraLink.href.match(/\/camera$/)).toBe(true);
  expect(screen.queryByAltText('bookCover')).not.toBeInTheDocument();
});

test('currentPhotoUrl', () => {
  render(<AddBookPage />, {
    initialState: {
      photos: { words: ['word1', 'word2'], currentPhotoPath: 'photoPath' },
    },
  });
  const cameraLink = screen.queryByRole('link', {
    name: /app.takePhoto/i,
  });
  expect(cameraLink).not.toBeInTheDocument();
  expect(screen.getByAltText('bookCover')).toBeInTheDocument();
});

test('validates', async () => {
  const user = userEvent.setup();

  render(<AddBookPage />);

  await user.type(screen.getByLabelText(/app.author/i), 'author');

  await user.type(screen.getByLabelText(/app.title/i), 'title');
  const submitBtn = screen.getByRole('button', {
    name: /app.save/i,
  });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(screen.queryByText(/errors.mandatoryField/i)).toBeInTheDocument();
  });
});

test('submits correctly', async () => {
  const user = userEvent.setup();
  const dispatch = jest.fn();
  render(<AddBookPage />, { dispatch });

  await user.type(screen.getByLabelText(/app.author/i), 'author');
  await user.type(screen.getByLabelText(/app.title/i), 'title');
  await user.type(screen.getByLabelText(/app.location/i), 'location');
  const submitBtn = screen.getByRole('button', {
    name: /app.save/i,
  });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(dispatch).toBeCalledWith({
      author: 'author',
      title: 'title',
      location: 'location',
      coverPath: '',
      type: 'add',
    });
    expect(dispatch).toBeCalledWith({
      type: 'photos/resetPhotoData',
    });
  });
});

test('displays no word', () => {
  render(<AddBookPage />);
  expect(
    screen.queryByText(/app.autocompleteInstructions/i),
  ).not.toBeInTheDocument();
});

test('displays words', () => {
  render(<AddBookPage />, {
    initialState: {
      photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
    },
  });
  expect(screen.getByText(/app.autocompleteInstructions/i)).toBeInTheDocument();
  expect(screen.getByText(/word1/i)).toBeInTheDocument();
  expect(screen.getByText(/word2/i)).toBeInTheDocument();
});

test('reset photo data', async () => {
  const user = userEvent.setup();

  const dispatch = jest.fn();
  render(<AddBookPage />, {
    dispatch,
    initialState: {
      photos: { words: ['word1', 'word2'], currentPhotoPath: 'path' },
    },
  });
  await user.click(screen.getByTestId('reset-photo-data-btn'));
  expect(dispatch).toBeCalledWith({
    type: 'photos/resetPhotoData',
  });
});

test('insert word', async () => {
  const user = userEvent.setup();

  render(<AddBookPage />, {
    initialState: {
      photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
    },
  });
  await user.click(screen.getByText(/word1/i));
  await user.click(screen.getByRole('radio', { name: /app.title/i }));
  await user.click(screen.getByText(/word2/i));
  expect(
    screen.getByRole<HTMLInputElement>('textbox', { name: /app.author/i })
      .value,
  ).toBe('word1');
  expect(
    screen.getByRole<HTMLInputElement>('textbox', { name: /app.title/i }).value,
  ).toBe('word2');
});
