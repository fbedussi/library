import { useQuery } from './useQuery'

jest.mock('react-router-dom', () => ({
	useLocation: () => ({ search: 'a=b' }),
}));

describe('useQuery', () => {
	it('returns a URLSearchParams object', () => {
		const query = useQuery();
		expect(query.get('a')).toBe('b');
	});
});
