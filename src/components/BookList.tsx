import type React from 'react';
import { useEffect } from 'react';
import { List, type RowComponentProps, useListRef } from 'react-window';

import type { Book, SearchCriteria } from '../model/model';
import BookCard from './BookCard';

const BooksList: React.FC<{
  books: Book[];
  sortingKey?: keyof SearchCriteria;
  selectedLetter?: string;
}> = ({ books, sortingKey, selectedLetter }) => {
  const listRef = useListRef(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: listRef is a stable ref object
  useEffect(() => {
    if (!sortingKey || !selectedLetter) {
      return;
    }

    if (sortingKey !== 'showOnlyNotRead') {
      const itemIndex = books.findIndex(book => {
        const field = book[sortingKey];
        const firstLetter = field ? field[0] : undefined;
        return !sortingKey || (firstLetter && firstLetter >= selectedLetter);
      });
      listRef.current?.scrollToRow({ index: itemIndex });
    }
  }, [selectedLetter, books, sortingKey]);

  return (
    <List
      listRef={listRef}
      rowHeight={190}
      rowCount={books.length}
      rowProps={{}}
      rowComponent={({ index, style }: RowComponentProps) => (
        <div
          className="book-card-container"
          style={style}
          key={books[index].id}
        >
          <BookCard book={books[index]} />
        </div>
      )}
    />
  );
};

export default BooksList;
