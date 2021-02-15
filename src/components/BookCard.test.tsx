import React from 'react'

import { Book } from '../model/model'
import { fireEvent, render, screen } from '../test-utils'
import BookCard from './BookCard'

jest.mock('../store/books/actions', () => ({
	remove: (id: string) => id,
}));

describe('BookCard', () => {
	const book: Book = {
		id: 'id',
		title: 'title',
		author: 'author',
		location: 'L',
		coverPath: 'path',
	};

	it('display data and image', () => {
		render(<BookCard book={book} />);
		const bookLink = screen.getByRole('link', {
			name: book.title,
		}) as HTMLAnchorElement;
		expect(bookLink).toBeInTheDocument();
		expect(bookLink.href.includes(`/book/${book.id}`)).toBe(true);
		expect(screen.getByText(book.author)).toBeInTheDocument();
		expect(screen.getByText(book.location)).toBeInTheDocument();
		expect(screen.getByTestId('edit-link')).toBeInTheDocument();
		const img = screen.getByTestId('book-cover');
		expect(img).toBeInTheDocument();
	});

	it('display data no image', () => {
		const bookNoImage = {
			...book,
			coverPath: '',
		};
		render(<BookCard book={bookNoImage} />);
		const img = screen.queryByTestId('book-cover');
		expect(img).not.toBeInTheDocument();
	});

	it('delete book', () => {
		const dispatch = jest.fn();
		render(<BookCard book={book} />, { dispatch });
		const deleteBtn = screen.getByTestId('delete-btn');
		expect(deleteBtn).toBeInTheDocument();
		fireEvent.click(deleteBtn);
		expect(dispatch).toBeCalledWith(book.id);
	});
});
