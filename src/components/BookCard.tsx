import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useDispatch } from 'react-redux';
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
    <Card
      variant="outlined"
      className={`book-card ${styles.card}`}
      style={style}
    >
      <div className={styles['book-info']}>
        <CardContent>
          <div className={styles['author-and-read-icon']}>
            {author}

            {read === false && <Cancel color="error" />}
            {read === true && <CheckCircle color="primary" />}
          </div>
          <LinkNoStyle to={`/book/${id}`}>
            <Typography variant="h5" component="h2" className="book-title">
              {title}
            </Typography>
          </LinkNoStyle>
          <Typography color="textSecondary">{location}</Typography>
          <Typography color="textSecondary">{category}</Typography>
        </CardContent>
        <CardActions className={styles.actions} disableSpacing>
          <IconButton
            data-testid="delete-btn"
            onClick={() => {
              dispatch(booksActions.remove(id));
              onDelete?.();
            }}
          >
            <Delete />
          </IconButton>
          <LinkNoStyle to={`/edit/${id}`} data-testid="edit-link">
            <IconButton>
              <Edit />
            </IconButton>
          </LinkNoStyle>
        </CardActions>
      </div>
      {!!coverPath && (
        <CardMedia
          className={styles['book-cover']}
          data-testid="book-cover"
          image={coverPath}
        />
      )}
    </Card>
  );
};

export default BookCard;
