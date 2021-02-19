import { TFunction } from 'i18next'

import { addBookFormValidation } from './validation'

const tMock: TFunction = (x: string) => x;

describe('addBookFormValidation', () => {
	it('works', () => {
		expect(
			addBookFormValidation(tMock)({ author: '', location: '', title: '' }),
		).toEqual({
			author: 'errors.mandatoryField',
			location: 'errors.mandatoryField',
			title: 'errors.mandatoryField',
		});
	});
});
