import { Typography } from '@mui/material';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import BackLink from '../components/BackLink';
import BooksList from '../components/BookList';
import {
  ToolbarStyled,
  TopAppBar,
  TopBarPageWrapper,
} from '../components/CommonComponents';
import SortingBar from '../components/SortingBar';
import ViewAllLink from '../components/ViewAllLink';
import { sort } from '../libs/search';
import { genCharArray, isSortingOrder } from '../libs/utils';
import type { SortingKey, SortingOrder } from '../model/model';
import { selectBooks } from '../store/books/selectors';
import styles from './viewAllPage.module.css';

const ViewAllPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const books = useSelector(selectBooks);
  const queryKey = (searchParams.get('key') as SortingKey) || null;
  const defaultSortingKey: SortingKey = 'author';
  const [sortingKey, setSortingKey] = useState(queryKey || defaultSortingKey);
  const queryOrder = searchParams.get('order');
  const defaultSortingOrder: SortingOrder = 'asc';
  const [sortingOrder, setSortingOrder] = useState(
    isSortingOrder(queryOrder) ? queryOrder : defaultSortingOrder,
  );
  const [selectedLetter, setSelectedLetter] = useState(
    searchParams.get('letter') || '',
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = genCharArray('A', 'Z');

  // biome-ignore lint/correctness/useExhaustiveDependencies: setSearchParams is a stable function
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('key', sortingKey);
    searchParams.set('order', sortingOrder);
    searchParams.set('letter', selectedLetter);
    setSearchParams(searchParams, { replace: true });
  }, [sortingKey, sortingOrder, selectedLetter]);

  const booksToRender = books.slice().sort((res1, res2) => {
    return (
      sort(res1[sortingKey], res2[sortingKey]) *
      (sortingOrder === 'asc' ? 1 : -1)
    );
  });

  return (
    <TopBarPageWrapper>
      <TopAppBar position="fixed" color="primary">
        <ToolbarStyled>
          <BackLink />
          <Typography variant="h6">Vedi tutti</Typography>
          <ViewAllLink />
        </ToolbarStyled>
      </TopAppBar>

      <SortingBar
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        sortingKey={sortingKey}
        setSortingKey={setSortingKey}
        foundNumber={booksToRender.length}
      />

      <div className={styles['letters-and-list']}>
        <div className={styles.letters}>
          {letters.map(letter => (
            <button
              type="button"
              key={letter}
              className={`${styles.letter}${selectedLetter === letter ? ` ${styles.active}` : ''}`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles['books-list-wrapper']} ref={containerRef}>
          <BooksList
            books={booksToRender}
            sortingKey={sortingKey}
            selectedLetter={selectedLetter}
          />
        </div>
      </div>
    </TopBarPageWrapper>
  );
};

export default ViewAllPage;
