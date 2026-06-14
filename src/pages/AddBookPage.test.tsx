import type { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Book } from '../model/model';
import type { getTestStore } from '../store';
import booksActions from '../store/books/actions';
import photosActions from '../store/photos/actions';
import { render, screen } from '../test-utils';
import AddBookPage from './AddBookPage';

vi.mock('../config', () => {
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

booksActions.add = ((x: Omit<Book, 'id'>) => ({
  ...x,
  type: 'add',
})) as unknown as typeof booksActions.add;
photosActions.resetPhotoData = (() => ({
  type: 'photos/resetPhotoData',
})) as ActionCreatorWithoutPayload<'photos/resetPhotoData'>;

test('renders correctly', () => {
  const page = render(<AddBookPage />);
  expect(page).toMatchSnapshot();
});

test('no currentPhotoUrl', () => {
  render(<AddBookPage />);
  const cameraLink = screen.getByRole<HTMLAnchorElement>('link', {
    name: /fotografa la copertina/i,
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
    name: /fotografa la copertina/i,
  });
  expect(cameraLink).not.toBeInTheDocument();
  expect(screen.getByAltText('bookCover')).toBeInTheDocument();
});

test('validates', async () => {
  const user = userEvent.setup();

  render(<AddBookPage />);

  await user.type(screen.getByLabelText(/autore/i), 'author');

  await user.type(screen.getByLabelText(/titolo/i), 'title');
  const submitBtn = screen.getByRole('button', {
    name: /salva/i,
  });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(screen.queryByText(/campo obbligatorio/i)).toBeInTheDocument();
  });
});

test('submits correctly', async () => {
  const user = userEvent.setup();
  const dispatch = vi.fn(() => Promise.resolve()) as ReturnType<
    typeof getTestStore
  >['dispatch'];
  render(<AddBookPage />, { dispatch });

  await user.type(screen.getByLabelText(/autore/i), 'author');
  await user.type(screen.getByLabelText(/titolo/i), 'title');
  await user.type(screen.getByLabelText(/collocazione/i), 'location');
  await user.type(screen.getByLabelText(/categoria/i), 'category');
  const submitBtn = screen.getByRole('button', {
    name: /salva/i,
  });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(dispatch).toBeCalledWith({
      author: 'author',
      title: 'title',
      location: 'location',
      coverPath: '',
      type: 'add',
      category: 'category',
    });
    expect(dispatch).toBeCalledWith({
      type: 'photos/resetPhotoData',
    });
  });
});

test('displays no word', () => {
  render(<AddBookPage />);
  expect(
    screen.queryByText(/autocompleteInstructions/i),
  ).not.toBeInTheDocument();
});

test('displays words', () => {
  render(<AddBookPage />, {
    initialState: {
      photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
    },
  });
  expect(screen.getByText(/Seleziona il campo/i)).toBeInTheDocument();
  expect(screen.getByText(/word1/i)).toBeInTheDocument();
  expect(screen.getByText(/word2/i)).toBeInTheDocument();
});

test('reset photo data', async () => {
  const user = userEvent.setup();

  const dispatch = vi.fn() as ReturnType<typeof getTestStore>['dispatch'];
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
  await user.click(screen.getByRole('radio', { name: /titolo/i }));
  await user.click(screen.getByText(/word2/i));
  expect(
    screen.getByRole<HTMLInputElement>('textbox', { name: /autore/i }).value,
  ).toBe('word1');
  expect(
    screen.getByRole<HTMLInputElement>('textbox', { name: /titolo/i }).value,
  ).toBe('word2');
});
