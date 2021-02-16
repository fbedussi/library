import { b64toBlob } from './photos'

describe('b64toBlob', () => {
	it('returns a blob', () => {
		expect(b64toBlob('abcdefgh') instanceof Blob).toBe(true);
	});
});
