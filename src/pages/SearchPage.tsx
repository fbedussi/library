import type { FuseResult } from 'fuse.js';
import type React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import BookForm from '../components/BookForm';
import BooksList from '../components/BookList';
import {
  CircularProgress,
  LinkNoStyle,
  TopAppBar,
} from '../components/CommonComponents';
import SortingBar from '../components/SortingBar';
import ViewAllLink from '../components/ViewAllLink';
import Add from '../icons/Add';
import MoreVert from '../icons/MoreVert ';
import Search from '../icons/Search';
import { convertRead, search, sort } from '../libs/search';
import type { Book, FormData, SortingKey, SortingOrder } from '../model/model';
import { selectBooks } from '../store/books/selectors';
import styles from './searchPage.module.css';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const author = searchParams.get('author') || '';
  const title = searchParams.get('title') || '';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || '';
  const showOnlyNotRead = searchParams.get('showOnlyNotRead') || '';
  const searchCriteria: FormData = useMemo(
    () => ({
      author,
      title,
      location,
      category,
      showOnlyNotRead: showOnlyNotRead === 'true',
    }),
    [author, title, location, category, showOnlyNotRead],
  );

  const books = useSelector(selectBooks);

  const queryScrollTop = searchParams.get('scrollTop');
  const defaultScrollTop = Number(queryScrollTop || '0');
  const scrollTopAtLanding = useRef(defaultScrollTop);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const setSearchCriteria = (values: FormData) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (values.author === '') {
      searchParams.delete('author');
    } else {
      searchParams.set('author', values.author);
    }

    if (values.title === '') {
      searchParams.delete('title');
    } else {
      searchParams.set('title', values.title);
    }

    if (values.location === '') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', values.location);
    }

    if (!values.category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', values.category);
    }

    if (!values.showOnlyNotRead) {
      searchParams.delete('showOnlyNotRead');
    } else {
      searchParams.set('showOnlyNotRead', 'true');
    }

    setSearchParams(searchParams, { replace: true });
  };

  const sortingKey = (searchParams.get('key') || 'author') as SortingKey;

  const setSortingKey = (sortingKey: SortingKey) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('key', sortingKey);
    setSearchParams(searchParams, { replace: true });
  };

  const sortingOrder = (searchParams.get('order') || 'asc') as SortingOrder;

  const setSortingOrder = (sortingOrder: SortingOrder) => {
    searchParams.set('order', sortingOrder);
    setSearchParams(searchParams, { replace: true });
  };

  const booksToShow = useMemo(() => {
    const filteredBooks: FuseResult<Book>[] | undefined = search(
      convertRead(searchCriteria),
    );
    const books =
      filteredBooks?.filter(({ score }) => {
        return score !== undefined && score < 0.72;
      }) || [];

    books.sort(
      (res1, res2) =>
        sort(res1.item[sortingKey], res2.item[sortingKey]) *
        (sortingOrder === 'asc' ? 1 : -1),
    );

    return books.map(({ item }) => item);
  }, [searchCriteria, sortingKey, sortingOrder]);

  useEffect(() => {
    if (scrollableContainerRef.current && booksToShow.length) {
      scrollableContainerRef.current.scrollTop = scrollTopAtLanding.current;
    }
  }, [booksToShow]);

  const navigate = useNavigate();

  return (
    <div
      className={styles.wrapper}
      // trick to rerender the component to apply searchCriteria to newly loaded books
      key={books.length.toString()}
      data-testid="search-page"
      ref={scrollableContainerRef}
      onScroll={e => {
        const searchParams = new URLSearchParams();

        searchParams.set('scrollTop', e.currentTarget.scrollTop.toString());
        setSearchParams(searchParams, { replace: true });
      }}
    >
      <TopAppBar>
        <button
          className="icon-btn"
          type="button"
          onClick={() => navigate('/settings')}
        >
          <MoreVert />
        </button>
        {!books.length ? <CircularProgress color="secondary" /> : null}
        <h1>Ricerca</h1>
        <ViewAllLink />
      </TopAppBar>
      <div className={styles['book-form-and-sorting-bar']}>
        <BookForm
          initialValues={searchCriteria}
          onSubmit={values => {
            setSearchCriteria(values);
          }}
          onReset={() => {
            setSearchCriteria({
              title: '',
              author: '',
              location: '',
              category: '',
            });
          }}
          PrimaryIcon={<Search />}
          primaryLabel="Ricerca"
          variant="search"
        />

        <SortingBar
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          sortingKey={sortingKey}
          setSortingKey={setSortingKey}
          foundNumber={booksToShow.length}
        />
      </div>

      <BooksList books={booksToShow} />

      <LinkNoStyle to="/add" className={styles['fab-link']}>
        <button type="button" className="fab" aria-label="add">
          <Add />
        </button>
      </LinkNoStyle>
    </div>
  );
};

export default SearchPage;
