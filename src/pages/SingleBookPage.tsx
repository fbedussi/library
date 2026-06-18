import type React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import BackLink from '../components/BackLink';
import BookCard from '../components/BookCard';
import { PageWrapper, TopAppBar } from '../components/CommonComponents';
import type { Id } from '../model/model';
import { selectBook } from '../store/books/selectors';

const SingleBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: Id }>();
  const book = useSelector(selectBook(bookId || ''));

  if (!book) {
    return null;
  }

  return (
    <PageWrapper>
      <TopAppBar>
        <BackLink />
      </TopAppBar>

      <BookCard book={book} />
    </PageWrapper>
  );
};

export default SingleBookPage;
