import { useSelector } from 'react-redux';
import Book from '../icons/Book';
import { selectBooks } from '../store/books/selectors';
import { LinkNoStyle } from './CommonComponents';

const ViewAllLink = () => {
  const books = useSelector(selectBooks);
  return (
    <LinkNoStyle to="/view-all">
      <button className="icon-btn" type="button">
        <div className="badge-wrapper">
          <div className="badge">{Math.min(books.length, 9999)}</div>
          <Book />
        </div>
      </button>
    </LinkNoStyle>
  );
};

export default ViewAllLink;
