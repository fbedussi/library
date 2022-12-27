import { render, screen } from '../test-utils'

import React from 'react'
import SortingBar from './SortingBar'
import userEvent from '@testing-library/user-event'

const setSortingKey = jest.fn();
const setSortingOrder = jest.fn();

test('has all the controls', () => {
	render(
		<SortingBar
			sortingKey="author"
			sortingOrder="asc"
			setSortingOrder={setSortingOrder}
			setSortingKey={setSortingKey}
		/>,
	);

	const authorRadio = screen.getByLabelText('app.author') as HTMLInputElement;
	expect(authorRadio).toBeInTheDocument();
	expect(authorRadio.checked).toBe(true);
	expect(screen.getByLabelText('app.title')).toBeInTheDocument();
	expect(screen.getByLabelText('app.locationShort')).toBeInTheDocument();
	expect(screen.getByTestId('sorting-btn')).toBeInTheDocument();
});

test('switch sorting order', () => {
	render(
		<SortingBar
			sortingKey="author"
			sortingOrder="asc"
			setSortingOrder={setSortingOrder}
			setSortingKey={setSortingKey}
		/>,
	);
	userEvent.click(screen.getByTestId('sorting-btn'));
	expect(setSortingOrder).toBeCalledWith('desc');
});

test('change sorting key', () => {
	render(
		<SortingBar
			sortingKey="author"
			sortingOrder="asc"
			setSortingOrder={setSortingOrder}
			setSortingKey={setSortingKey}
		/>,
	);
	userEvent.click(screen.getByLabelText('app.locationShort'));
	expect(setSortingKey).toBeCalledWith('location');
});
