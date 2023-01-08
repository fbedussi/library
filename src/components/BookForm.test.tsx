import React from 'react'

import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../test-utils'
import BookForm from './BookForm'

jest.mock('../store/books/actions', () => ({
	remove: (id: string) => id,
}));

const initialValues = {
	title: 'title',
	author: 'author',
	location: 'location',
	read: '',
};

const onSubmit = jest.fn();

test('displays the fields with initial values', () => {
	render(
		<BookForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			primaryLabel="submit"
			PrimaryIcon={<span></span>}
		/>,
	);

	expect(screen.getByLabelText(/app.author/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/app.title/i)).toBeInTheDocument();
	expect(screen.getByLabelText(/app.location/i)).toBeInTheDocument();

	expect(screen.getByDisplayValue('author')).toBeInTheDocument();
	expect(screen.getByDisplayValue('title')).toBeInTheDocument();
	expect(screen.getByDisplayValue('location')).toBeInTheDocument();
});

test('displays the buttons', () => {
	render(
		<BookForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			primaryLabel="submit"
			PrimaryIcon={<span></span>}
		/>,
	);

	const submitBtn = screen.getByRole<HTMLButtonElement>('button', {
		name: 'submit',
	});
	expect(submitBtn).toBeInTheDocument();
	expect(submitBtn.type).toBe('submit');
	const resetBtn = screen.getByRole('button', {
		name: 'app.reset',
	}) as HTMLButtonElement;
	expect(resetBtn).toBeInTheDocument();
	expect(resetBtn.type).toBe('reset');
});

test('displays error', async () => {
	const user = userEvent.setup();
	render(
		<BookForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			primaryLabel="submit"
			PrimaryIcon={<span></span>}
			validate={() => ({
				title: 'errTitle',
				author: 'errAuthor',
				location: 'errLocation',
			})}
		/>,
	);
	await user.type(screen.getByLabelText(/app.author/i), 'author2');
	const submitBtn = screen.getByRole('button', {
		name: 'submit',
	}) as HTMLButtonElement;
	await user.click(submitBtn);
	expect(onSubmit).not.toBeCalled();
	expect(await screen.findByText(/errTitle/i)).toBeInTheDocument();
	expect(await screen.findByText(/errAuthor/i)).toBeInTheDocument();
	expect(await screen.findByText(/errLocation/i)).toBeInTheDocument();
});

test('calls onSubmit', async () => {
	const onSubmit = jest.fn();
	const user = userEvent.setup();

	render(
		<BookForm
			initialValues={initialValues}
			onSubmit={onSubmit}
			primaryLabel="submit"
			PrimaryIcon={<span></span>}
		/>,
	);
	await user.type(screen.getByLabelText(/app.author/i), 'author2');
	const submitBtn = screen.getByRole<HTMLButtonElement>('button', {
		name: 'submit',
	});
	expect(submitBtn.disabled).toBe(false);
	await user.click(submitBtn);
	waitFor(() => {
		expect(onSubmit).toBeCalled();
	});
});
