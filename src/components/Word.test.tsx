import React from 'react'

import userEvent from '@testing-library/user-event'

import { render, screen } from '../test-utils'
import Word from './Word'

test('does the selection', () => {
	const onClickCb = jest.fn();
	const word = 'word';
	render(<Word word={word} onClick={onClickCb} />);

	const el = screen.getByTestId('word');
	userEvent.click(el);
	expect(onClickCb).toBeCalled();
	expect(el.className.includes('clicked')).toBe(true);
});
