import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import BookForm from '../components/BookForm';
import BooksList from '../components/BookList';
import {
  LinkNoStyle,
  ToolbarStyled,
  TopAppBar,
} from '../components/CommonComponents';
import SortingBar from '../components/SortingBar';
import ViewAllLink from '../components/ViewAllLink';
import { convertRead, search, sort } from '../libs/search';
import { Book, FormData, SortingOrder, SortingKey } from '../model/model';
import { selectBooks } from '../store/books/selectors';
import { CircularProgress, Fab, IconButton, Typography } from '@mui/material';
import { Add, MoreVert, Search } from '@mui/icons-material';
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
  const defaultScrollTop = parseInt(queryScrollTop || '0');
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
    const filteredBooks: Fuse.FuseResult<Book>[] | undefined = search(
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
  }, [searchCriteria, sortingKey, sortingOrder, books]);

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
      <TopAppBar position="fixed" color="primary">
        <ToolbarStyled>
          <IconButton color="inherit" onClick={() => navigate('/settings')}>
            <MoreVert />
          </IconButton>
          {!books.length ? <CircularProgress color="secondary" /> : null}
          <Typography variant="h6">Ricerca</Typography>
          <ViewAllLink />
        </ToolbarStyled>
      </TopAppBar>
      <div className={styles['book-form-and-sorting-bar']}>
        <BookForm
          initialValues={searchCriteria}
          onSubmit={(values, reset) => {
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

      <BooksList
        books={booksToShow}
      />

      <LinkNoStyle to="/add" className={styles['fab-link']}>
        <Fab color="secondary" aria-label="add">
          <Add />
        </Fab>
      </LinkNoStyle>
    </div>
  );
};

export default SearchPage;
