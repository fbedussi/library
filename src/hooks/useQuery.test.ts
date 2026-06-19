import { useQuery } from './useQuery';

vi.mock('react-router', () => ({
  useLocation: () => ({ search: 'a=b' }),
}));

test('returns a URLSearchParams object', () => {
  const query = useQuery();
  expect(query.get('a')).toBe('b');
});
