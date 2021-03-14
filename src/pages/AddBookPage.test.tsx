import React from 'react'

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'

import booksActions from '../store/books/actions'
import photosActions from '../store/photos/actions'
import { act, fireEvent, render, screen } from '../test-utils'
import AddBookPage from './AddBookPage'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
	const originalModule = jest.requireActual('react-redux');
	return {
		...originalModule,
		useDispatch: () => mockDispatch,
	};
});

booksActions.add = (x: any) => ({ ...x, type: 'add' });
photosActions.resetPhotoData = ((x: any) => ({
	...x,
	type: 'resetPhoto',
})) as ActionCreatorWithoutPayload<string>;

describe('AddBookPage', () => {
	it('renders correcly', () => {
		const page = render(<AddBookPage />);
		expect(page).toMatchSnapshot();
	});

	it('no currentPhotoUrl', () => {
		render(<AddBookPage />);
		const cameraLink = screen.getByRole<HTMLAnchorElement>('link', {
			name: /app.takePhoto/i,
		});
		expect(cameraLink).toBeInTheDocument();
		expect(!!cameraLink.href.match(/\/camera$/)).toBe(true);
		expect(screen.queryByAltText('bookCover')).not.toBeInTheDocument();
	});

	it('currentPhotoUrl', () => {
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

	it('validates', async () => {
		render(<AddBookPage />);

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
			const submitBtn = screen.getByRole('button', {
				name: /app.save/i,
			});
			fireEvent.click(submitBtn);
		});
		await waitFor(() => {
			expect(screen.queryByText(/errors.mandatoryField/i)).toBeInTheDocument();
		});
	});

	it('submits correctly', async () => {
		render(<AddBookPage />);

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
				type: 'add',
			});
			expect(mockDispatch).toBeCalledWith({
				type: 'resetPhoto',
			});
		});
	});

	it('displays no word', () => {
		render(<AddBookPage />);
		expect(
			screen.queryByText(/app.autocompleteInstructions/i),
		).not.toBeInTheDocument();
	});

	it('displays words', () => {
		render(<AddBookPage />, {
			initialState: {
				photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
			},
		});
		expect(
			screen.getByText(/app.autocompleteInstructions/i),
		).toBeInTheDocument();
		expect(screen.getByText(/word1/i)).toBeInTheDocument();
		expect(screen.getByText(/word2/i)).toBeInTheDocument();
	});

	it('reset photo data', () => {
		render(<AddBookPage />, {
			initialState: {
				photos: { words: ['word1', 'word2'], currentPhotoPath: 'path' },
			},
		});
		fireEvent.click(screen.getByTestId('reset-photo-data-btn'));
		expect(mockDispatch).toBeCalledWith({
			type: 'resetPhoto',
		});
	});

	it('insert word', () => {
		render(<AddBookPage />, {
			initialState: {
				photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
			},
		});
		act(() => {
			fireEvent.click(screen.getByText(/word1/i));
		});
		act(() => {
			fireEvent.click(screen.getByRole('radio', { name: /app.title/i }));
		});
		act(() => {
			fireEvent.click(screen.getByText(/word2/i));
		});
		expect(
			screen.getByRole<HTMLInputElement>('textbox', { name: /app.author/i })
				.value,
		).toBe('word1');
		expect(
			screen.getByRole<HTMLInputElement>('textbox', { name: /app.title/i })
				.value,
		).toBe('word2');
	});
});
