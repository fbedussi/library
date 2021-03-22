import React from 'react'

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import booksActions from '../store/books/actions'
import photosActions from '../store/photos/actions'
import { render, screen } from '../test-utils'
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

test('renders correcly', () => {
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
	render(<AddBookPage />);

	userEvent.type(screen.getByLabelText(/app.author/i), 'author');

	userEvent.type(screen.getByLabelText(/app.title/i), 'title');
	const submitBtn = screen.getByRole('button', {
		name: /app.save/i,
	});
	userEvent.click(submitBtn);
	await waitFor(() => {
		expect(screen.queryByText(/errors.mandatoryField/i)).toBeInTheDocument();
	});
});

test('submits correctly', async () => {
	render(<AddBookPage />);

	userEvent.type(screen.getByLabelText(/app.author/i), 'author');
	userEvent.type(screen.getByLabelText(/app.title/i), 'title');
	userEvent.type(screen.getByLabelText(/app.location/i), 'location');
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
			type: 'add',
		});
		expect(mockDispatch).toBeCalledWith({
			type: 'resetPhoto',
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

test('reset photo data', () => {
	render(<AddBookPage />, {
		initialState: {
			photos: { words: ['word1', 'word2'], currentPhotoPath: 'path' },
		},
	});
	userEvent.click(screen.getByTestId('reset-photo-data-btn'));
	expect(mockDispatch).toBeCalledWith({
		type: 'resetPhoto',
	});
});

test('insert word', () => {
	render(<AddBookPage />, {
		initialState: {
			photos: { words: ['word1', 'word2'], currentPhotoPath: '' },
		},
	});
	userEvent.click(screen.getByText(/word1/i));
	userEvent.click(screen.getByRole('radio', { name: /app.title/i }));
	userEvent.click(screen.getByText(/word2/i));
	expect(
		screen.getByRole<HTMLInputElement>('textbox', { name: /app.author/i })
			.value,
	).toBe('word1');
	expect(
		screen.getByRole<HTMLInputElement>('textbox', { name: /app.title/i }).value,
	).toBe('word2');
});
