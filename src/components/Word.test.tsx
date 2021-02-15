import React from 'react'

import { fireEvent, render, screen } from '../test-utils'
import Word from './Word'

describe('Word', () => {
	it('does the selection', () => {
		const onClickCb = jest.fn();
		const word = 'word';
		render(<Word word={word} onClick={onClickCb} />);

		const el = screen.getByTestId('word');
		fireEvent.click(el);
		expect(onClickCb).toBeCalled();
		expect(el.className.includes('clicked')).toBe(true);
	});
});
