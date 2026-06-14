import { Book } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBooks } from '../store/books/selectors';
import { LinkNoStyle } from './CommonComponents';

const ViewAllLink = () => {
  const books = useSelector(selectBooks);
  return (
    <LinkNoStyle to="/view-all">
      <IconButton color="inherit">
        <Badge badgeContent={books.length} color="secondary" max={9999}>
          <Book />
        </Badge>
      </IconButton>
    </LinkNoStyle>
  );
};

export default ViewAllLink;
