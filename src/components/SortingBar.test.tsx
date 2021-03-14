import React from 'react'

import { fireEvent, render, screen } from '../test-utils'
import SortingBar from './SortingBar'

const setSortingKey = jest.fn();
const setSortingOrder = jest.fn();

describe('SortingBar', () => {
	it('has all the controls', () => {
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
		expect(screen.getByLabelText('app.location')).toBeInTheDocument();
		expect(screen.getByTestId('sorting-btn')).toBeInTheDocument();
	});

	it('switch sorting order', () => {
		render(
			<SortingBar
				sortingKey="author"
				sortingOrder="asc"
				setSortingOrder={setSortingOrder}
				setSortingKey={setSortingKey}
			/>,
		);
		fireEvent.click(screen.getByTestId('sorting-btn'));
		expect(setSortingOrder).toBeCalledWith('desc');
	});

	it('change sorting key', () => {
		render(
			<SortingBar
				sortingKey="author"
				sortingOrder="asc"
				setSortingOrder={setSortingOrder}
				setSortingKey={setSortingKey}
			/>,
		);
		fireEvent.click(screen.getByLabelText('app.location'));
		expect(setSortingKey).toBeCalledWith('location');
	});
});
