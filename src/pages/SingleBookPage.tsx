import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BackLink from '../components/BackLink';
import BookCard from '../components/BookCard';
import {
  BottomAppBar,
  BottomBarPageWrapper,
  ToolbarStyled,
} from '../components/CommonComponents';
import { Id } from '../model/model';
import { selectBook } from '../store/books/selectors';

const SingleBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: Id }>();
  const book = useSelector(selectBook(bookId || ''));

  if (!book) {
    return null;
  }

  return (
    <BottomBarPageWrapper>
      <BookCard book={book} />
      <BottomAppBar position="fixed" color="primary">
        <ToolbarStyled>
          <BackLink />
        </ToolbarStyled>
      </BottomAppBar>
    </BottomBarPageWrapper>
  );
};

export default SingleBookPage;
