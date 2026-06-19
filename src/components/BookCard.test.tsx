import userEvent from '@testing-library/user-event';

import type { Book } from '../model/model';
import { render, screen } from '../test-utils';
import BookCard from './BookCard';

vi.mock('../store/books/actions', () => ({
  default: { remove: (id: string) => id },
}));

const book: Book = {
  id: 'id',
  title: 'title',
  author: 'author',
  location: 'L',
  category: 'category',
  coverPath: 'path',
};

test('display data and image', () => {
  render(<BookCard book={book} />);
  const bookLink = screen.getByRole('link', {
    name: book.title,
  }) as HTMLAnchorElement;
  expect(bookLink).toBeInTheDocument();
  expect(bookLink.href.includes(`/book/${book.id}`)).toBe(true);
  expect(screen.getByText(book.author)).toBeInTheDocument();
  expect(screen.getByText(book.location)).toBeInTheDocument();
  expect(book.category && screen.getByText(book.category)).toBeInTheDocument();
  expect(screen.getByTestId('edit-link')).toBeInTheDocument();
  const img = screen.getByTestId('book-cover');
  expect(img).toBeInTheDocument();
});

test('display data no image', () => {
  const bookNoImage = {
    ...book,
    coverPath: '',
  };
  render(<BookCard book={bookNoImage} />);
  const img = screen.queryByTestId('book-cover');
  expect(img).not.toBeInTheDocument();
});

test('delete book', async () => {
  const user = userEvent.setup();
  const dispatch = vi.fn();
  render(<BookCard book={book} />, { dispatch });
  const deleteBtn = screen.getByTestId('delete-btn');
  expect(deleteBtn).toBeInTheDocument();
  await user.click(deleteBtn);
  expect(dispatch).toBeCalledWith(book.id);
});
