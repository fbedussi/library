import { b64toBlob } from './photos'

test('b64toBlob returns a blob', () => {
	expect(b64toBlob('abcdefgh') instanceof Blob).toBe(true);
});
