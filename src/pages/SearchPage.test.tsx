import userEvent from '@testing-library/user-event';
import * as router from 'react-router';

import { initSearch } from '../libs/search';
import { render, screen, waitFor } from '../test-utils';
import SearchPage from './SearchPage';

vi.mock('react-router', async importOriginal => ({
  ...(await importOriginal()),
  useNavigate: vi.fn(),
}));

beforeEach(async () => {
  const actual = await vi.importActual<typeof router>('react-router');
  vi.mocked(router.useNavigate).mockImplementation(actual.useNavigate);
});

const books = [
  {
    id: '1',
    author: 'Andrea Camilleri',
    title: 'Gli arancini di Montalbano',
    location: 'A2',
    category: 'narrativa',
    coverPath: '',
  },
  {
    id: '2',
    author: 'Andrea Camilleri',
    title: 'La pensione eva',
    location: 'B2',
    category: 'narrativa',
    coverPath: '',
  },
];

test('renders', () => {
  const page = render(<SearchPage />);
  expect(page).toMatchSnapshot();
});

test('shows circular progress while loading books', () => {
  render(<SearchPage />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('hides circular progress when books are loaded', () => {
  render(<SearchPage />, {
    initialState: {
      books,
    },
  });
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('displays search results', async () => {
  const user = userEvent.setup();

  initSearch(books);

  render(<SearchPage />, {
    initialState: {
      books,
    },
  });
  await user.type(
    screen.getByRole('textbox', { name: /autore/i }),
    'camilleri',
  );
  await user.click(screen.getByRole('button', { name: /ricerca/i }));
  expect(
    await screen.findByText('Gli arancini di Montalbano'),
  ).toBeInTheDocument();
});

test('apply search params in the query string', () => {
  render(<SearchPage />, {
    initialState: {
      books,
    },
    route: '?author=camilleri',
  });
  expect(screen.getByRole('form')).toHaveFormValues({
    author: 'camilleri',
  });
});

test('toggle order', async () => {
  const user = userEvent.setup();

  initSearch(books);

  render(<SearchPage />, {
    initialState: {
      books,
    },
    route: '?author=camilleri&key=location&order=asc',
  });

  expect(screen.getAllByText(/A2|B2/).map(el => el.textContent)).toEqual([
    'A2',
    'B2',
  ]);

  await user.click(screen.getByTestId('sorting-btn'));

  await waitFor(() => {
    expect(screen.getAllByText(/B2|A2/).map(el => el.textContent)).toEqual([
      'B2',
      'A2',
    ]);
  });
});
