import React from 'react'
import { Route } from 'react-router-dom'

import booksActions from '../store/books/actions'
import { act, fireEvent, render, screen, waitFor } from '../test-utils'
import EditBookPage from './EditBookPage'

jest.mock('../data', () => ({}));

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key }),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');
	return {
		...originalModule,
		useDispatch: () => mockDispatch,
	};
});

booksActions.update = (x: any) => ({ ...x, type: 'update' });

describe('EditBookPage', () => {
	it('renders correcly - no book', () => {
		const page = render(<EditBookPage />);
		expect(page).toMatchSnapshot();
	});

	it('renders correcly - with book', () => {
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

	it('submits correctly', async () => {
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

		act(() => {
			fireEvent.change(screen.getByLabelText(/app.author/i), {
				target: { value: 'author' },
			});
		});

		act(() => {
			fireEvent.change(screen.getByLabelText(/app.title/i), {
				target: { value: 'title' },
			});
		});

		act(() => {
			fireEvent.change(screen.getByLabelText(/app.location/i), {
				target: { value: 'location' },
			});
		});
		act(() => {
			const submitBtn = screen.getByRole('button', {
				name: /app.save/i,
			});
			fireEvent.click(submitBtn);
		});
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
});
