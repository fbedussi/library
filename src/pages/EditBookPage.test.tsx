import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';

import type { Book } from '../model/model';
import booksActions from '../store/books/actions';
import { render, screen, waitFor } from '../test-utils';
import EditBookPage from './EditBookPage';

booksActions.update = ((x: Book) => ({
  ...x,
  type: 'update',
})) as unknown as typeof booksActions.update;

test('renders correctly - no book', () => {
  const page = render(<EditBookPage />);
  expect(page).toMatchSnapshot();
});

test('renders correctly - with book', () => {
  const page = render(
    <Routes>
      <Route path="/edit/:bookId" element={<EditBookPage />} />
    </Routes>,
    {
      initialState: {
        books: [
          {
            id: 'B',
            author: 'a',
            title: 't',
            location: 'l',
            coverPath: '',
            category: 'cat',
          },
        ],
      },
      route: '/edit/B',
    },
  );
  expect(page).toMatchSnapshot();
});

test('submits correctly', async () => {
  const dispatch = vi.fn();
  render(
    <Routes>
      <Route path="/edit/:bookId" element={<EditBookPage />} />
    </Routes>,
    {
      initialState: {
        books: [
          {
            id: 'B',
            author: 'a',
            title: 't',
            location: 'l',
            coverPath: '',
            category: 'cay',
          },
        ],
      },
      dispatch,
      route: '/edit/B',
    },
  );
  const authorInput = screen.getByLabelText(/autore/i);
  const user = userEvent.setup();

  expect(authorInput).toBeInTheDocument();
  await user.clear(authorInput);
  await user.type(authorInput, 'author');
  const titleInput = screen.getByLabelText(/titolo/i);
  await user.clear(titleInput);
  await user.type(titleInput, 'title');
  const locationInput = screen.getByLabelText(/collocazione/i);
  await user.clear(locationInput);
  await user.type(locationInput, 'location');
  const categoryInput = screen.getByLabelText(/categoria/i);
  await user.clear(categoryInput);
  await user.type(categoryInput, 'category');
  const submitBtn = screen.getByRole('button', {
    name: /salva/i,
  });
  await user.click(submitBtn);
  await waitFor(() => {
    expect(dispatch).toBeCalledWith({
      author: 'author',
      title: 'title',
      location: 'location',
      category: 'category',
      coverPath: '',
      id: 'B',
      type: 'update',
    });
  });
});
