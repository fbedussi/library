import { TFunction } from 'i18next'

import { bookFormValidation } from './validation'

const tMock: TFunction = (x: string) => x;

describe('bookFormValidation', () => {
	it('works', () => {
		expect(
			bookFormValidation(tMock)({ author: '', location: '', title: '' }),
		).toEqual({
			author: 'errors.mandatoryField',
			location: 'errors.mandatoryField',
			title: 'errors.mandatoryField',
		});
	});
});
