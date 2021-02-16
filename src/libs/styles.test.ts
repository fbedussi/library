import { pxToRem } from './styles'

describe('pxToRem', () => {
	it('works', () => {
		expect(pxToRem(16)).toEqual(1);
	});
});
