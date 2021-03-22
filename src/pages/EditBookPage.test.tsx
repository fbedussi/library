import React from 'react'
import { Route } from 'react-router-dom'

import userEvent from '@testing-library/user-event'

import booksActions from '../store/books/actions'
import { render, screen, waitFor } from '../test-utils'
import EditBookPage from './EditBookPage'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');
	return {
		...originalModule,
		useDispatch: () => mockDispatch,
	};
});

booksActions.update = (x: any) => ({ ...x, type: 'update' });

test('renders correcly - no book', () => {
	const page = render(<EditBookPage />);
	expect(page).toMatchSnapshot();
});

test('renders correcly - with book', () => {
	const page = render(
		<Route path="/edit/:bookId">
			<EditBookPage />
		</Route>,
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
	render(
		<Route path="/edit/:bookId">
			<EditBookPage />
		</Route>,
		{
			initialState: {
				books: [
					{ id: 'B', author: 'a', title: 't', location: 'l', coverPath: '' },
				],
			},
			route: '/edit/B',
		},
	);
	const authorInput = screen.getByLabelText(/app.author/i);
	userEvent.clear(authorInput);
	userEvent.type(authorInput, 'author');
	const titleInput = screen.getByLabelText(/app.title/i);
	userEvent.clear(titleInput);
	userEvent.type(titleInput, 'title');
	const locationInput = screen.getByLabelText(/app.location/i);
	userEvent.clear(locationInput);
	userEvent.type(locationInput, 'location');
	const submitBtn = screen.getByRole('button', {
		name: /app.save/i,
	});
	userEvent.click(submitBtn);
	await waitFor(() => {
		expect(mockDispatch).toBeCalledWith({
			author: 'author',
			title: 'title',
			location: 'location',
			coverPath: '',
			id: 'B',
			type: 'update',
		});
	});
});
