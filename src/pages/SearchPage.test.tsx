import React from 'react'
import * as router from 'react-router-dom'

import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../test-utils'
import SearchPage from './SearchPage'

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	(router.useNavigate as any).mockImplementation(
		jest.requireActual('react-router-dom').useNavigate,
	);
});

const books = [
	{
		id: '1',
		author: 'Andrea Camilleri',
		title: 'Gli arancini di Montalbano',
		location: 'A2',
		coverPath: '',
	},
	{
		id: '2',
		author: 'Andrea Camilleri',
		title: 'La pensione eva',
		location: 'B2',
		coverPath: '',
	},
];

test('renders', () => {
	const page = render(<SearchPage />);
	expect(page).toMatchSnapshot();
});

test('shows circular progress while loading books', () => {
	render(<SearchPage />);
	expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides circular progress when books are loaded', () => {
	render(<SearchPage />, {
		initialState: {
			books,
		},
	});
	expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('displays search results', async () => {
	render(<SearchPage />, {
		initialState: {
			books,
		},
	});
	userEvent.type(
		screen.getByRole('textbox', { name: /app.author/i }),
		'camilleri',
	);
	userEvent.click(screen.getByRole('button', { name: /app.search/i }));
	expect(
		await screen.findByText('Gli arancini di Montalbano'),
	).toBeInTheDocument();
});

test('persist search params in the query string', async () => {
	const navigate = jest.spyOn(router, 'useNavigate');

	render(<SearchPage />, {
		initialState: {
			books,
		},
	});
	userEvent.type(
		screen.getByRole('textbox', { name: /app.author/i }),
		'camilleri',
	);
	userEvent.click(screen.getByRole('button', { name: /app.search/i }));
	await waitFor(() => {
		expect(navigate).toHaveBeenLastCalledWith({
			search: expect.stringMatching(/author=camilleri/),
		});
	});
});

test('applys search params in the query string', () => {
	render(<SearchPage />, {
		initialState: {
			books,
		},
		route: '?author=camilleri',
	});
	expect(screen.getByRole('form')).toHaveFormValues({
		author: 'camilleri',
	});
});

test('toggle order', async () => {
	render(<SearchPage />, {
		initialState: {
			books,
		},
		route: '?author=camilleri&key=location',
	});
	expect(screen.getAllByText(/A2|B2/).map(el => el.textContent)).toEqual([
		'A2',
		'B2',
	]);
	userEvent.click(screen.getByTestId('sorting-btn'));
	expect(screen.getAllByText(/B2|A2/).map(el => el.textContent)).toEqual([
		'B2',
		'A2',
	]);
});
