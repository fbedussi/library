import type React from 'react';
import { useDispatch } from 'react-redux';
import Cancel from '../icons/Cancel';
import CheckCircle from '../icons/CheckCircle';
import Delete from '../icons/Delete';
import Edit from '../icons/Edit';
import type { Book } from '../model/model';
import type { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import styles from './bookCard.module.css';
import { LinkNoStyle } from './CommonComponents';

const BookCard: React.FC<{
  book: Book;
  onDelete?: () => void;
  style?: React.CSSProperties;
}> = ({ book, style, onDelete }) => {
  const dispatch: TDispatch = useDispatch();
  const { author, title, location, category, id, coverPath, read } = book;
  return (
    <article className={`card ${styles.card}`} style={style}>
      <div className={styles['book-info']}>
        <div>
          <div className={styles['author-and-read-icon']}>
            {author}

            {read === false && <Cancel className="error" />}
            {read === true && <CheckCircle className="primary" />}
          </div>
          <LinkNoStyle to={`/book/${id}`}>
            <h2 className="book-title">{title}</h2>
          </LinkNoStyle>
          <div className="color-secondary">{location}</div>
          <div className="color-secondary">{category}</div>
        </div>
        {!!coverPath && (
          <div className={styles['book-cover']} data-testid="book-cover">
            <img src={coverPath} alt="copertina" />
          </div>
        )}
      </div>
      <footer className={styles.actions}>
        <button
          type="button"
          className="icon-btn"
          data-testid="delete-btn"
          onClick={() => {
            dispatch(booksActions.remove(id));
            onDelete?.();
          }}
        >
          <Delete />
        </button>
        <LinkNoStyle to={`/edit/${id}`} data-testid="edit-link">
          <button type="button" className="icon-btn">
            <Edit />
          </button>
        </LinkNoStyle>
      </footer>
    </article>
  );
};

export default BookCard;
