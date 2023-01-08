import React from 'react'
import { Route, Routes } from 'react-router-dom'

import userEvent from '@testing-library/user-event'

import booksActions from '../store/books/actions'
import { render, screen, waitFor } from '../test-utils'
import EditBookPage from './EditBookPage'

booksActions.update = (x: any) => ({ ...x, type: 'update' });

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
					{ id: 'B', author: 'a', title: 't', location: 'l', coverPath: '' },
				],
			},
			route: '/edit/B',
		},
	);
	expect(page).toMatchSnapshot();
});

test('submits correctly', async () => {
	const dispatch = jest.fn();
	render(
		<Routes>
			<Route path="/edit/:bookId" element={<EditBookPage />} />
		</Routes>,
		{
			initialState: {
				books: [
					{ id: 'B', author: 'a', title: 't', location: 'l', coverPath: '' },
				],
			},
			dispatch,
			route: '/edit/B',
		},
	);
	const authorInput = screen.getByLabelText(/app.author/i);
	const user = userEvent.setup();

	expect(authorInput).toBeInTheDocument();
	await user.clear(authorInput);
	await user.type(authorInput, 'author');
	const titleInput = screen.getByLabelText(/app.title/i);
	await user.clear(titleInput);
	await user.type(titleInput, 'title');
	const locationInput = screen.getByLabelText(/app.location/i);
	await user.clear(locationInput);
	await user.type(locationInput, 'location');
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
			id: 'B',
			type: 'update',
		});
	});
});
