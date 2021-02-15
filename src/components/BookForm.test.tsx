import React from 'react'

import { act, fireEvent, render, screen, waitFor } from '../test-utils'
import BookForm from './BookForm'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../store/books/actions', () => ({
	remove: (id: string) => id,
}));

describe('BookForm', () => {
	const initialValues = {
		title: 'title',
		author: 'author',
		location: 'location',
	};

	const onSubmit = jest.fn();

	it('displays the fields with initial values', () => {
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

	it('displays the buttons', () => {
		render(
			<BookForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				primaryLabel="submit"
				PrimaryIcon={<span></span>}
			/>,
		);

		const submitBtn = screen.getByRole('button', {
			name: 'submit',
		}) as HTMLButtonElement;
		expect(submitBtn).toBeInTheDocument();
		expect(submitBtn.type).toBe('submit');
		const resetBtn = screen.getByRole('button', {
			name: 'app.reset',
		}) as HTMLButtonElement;
		expect(resetBtn).toBeInTheDocument();
		expect(resetBtn.type).toBe('reset');
	});

	it('save is disabled if not dirty', () => {
		render(
			<BookForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				primaryLabel="submit"
				PrimaryIcon={<span></span>}
			/>,
		);
		const submitBtn = screen.getByRole('button', {
			name: 'submit',
		}) as HTMLButtonElement;
		expect(submitBtn.disabled).toBe(true);

		fireEvent.change(screen.getByLabelText(/app.author/i), {
			target: { value: 'author2' },
		});
		expect(submitBtn.disabled).toBe(false);
	});

	it('displays error', async () => {
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
		act(() => {
			fireEvent.change(screen.getByLabelText(/app.author/i), {
				target: { value: 'author2' },
			});
		});
		const submitBtn = screen.getByRole('button', {
			name: 'submit',
		}) as HTMLButtonElement;
		fireEvent.click(submitBtn);
		expect(onSubmit).not.toBeCalled();
		expect(await screen.findByText(/errTitle/i)).toBeInTheDocument();
		expect(await screen.findByText(/errAuthor/i)).toBeInTheDocument();
		expect(await screen.findByText(/errLocation/i)).toBeInTheDocument();
	});

	it('calls onSubmit', () => {
		const onSubmit = jest.fn();

		render(
			<BookForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				primaryLabel="submit"
				PrimaryIcon={<span></span>}
			/>,
		);
		act(() => {
			fireEvent.change(screen.getByLabelText(/app.author/i), {
				target: { value: 'author2' },
			});
		});
		const submitBtn = screen.getByRole('button', {
			name: 'submit',
		}) as HTMLButtonElement;
		expect(submitBtn.disabled).toBe(false);
		fireEvent.click(submitBtn);
		waitFor(() => {
			expect(onSubmit).toBeCalled();
		});
	});
});
