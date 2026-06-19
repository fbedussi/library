import { render, screen } from '../test-utils';
import ViewAllLink from './ViewAllLink';

vi.mock('../store/books/selectors', async importOriginal => {
  const originalModule = await importOriginal<object>();

  return {
    ...originalModule,
    selectBooks: () => [1, 2, 3],
  };
});

test('has the right link', () => {
  render(<ViewAllLink />);

  const link = screen.getByRole<HTMLAnchorElement>('link');
  expect(!!link.href.match(/\/view-all$/)).toBe(true);
});

test('dispalys the right number of books', () => {
  render(<ViewAllLink />);
  expect(screen.getByText('3')).toBeInTheDocument();
});
