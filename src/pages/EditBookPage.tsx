import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import BackLink from '../components/BackLink';
import BookForm from '../components/BookForm';
import { PageWrapper, TopAppBar } from '../components/CommonComponents';
import Save from '../icons/Save';
import { convertRead } from '../libs/search';
import { bookFormValidation } from '../libs/validation';
import type { FormData, Id } from '../model/model';
import type { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import { selectBook } from '../store/books/selectors';

const EditBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: Id }>();
  const dispatch: TDispatch = useDispatch();
  const book = useSelector(selectBook(bookId || ''));

  if (!book) {
    return null;
  }

  const { author, title, location, read, category } = book;
  const initialValues: FormData = {
    author,
    title,
    location,
    read: read?.toString() || '',
    category: category || '',
  };

  return (
    <PageWrapper>
      <TopAppBar>
        <BackLink />
      </TopAppBar>

      <BookForm
        initialValues={initialValues}
        enableReinitialize={true}
        validate={bookFormValidation()}
        onSubmit={values => {
          dispatch(booksActions.update(convertRead({ ...book, ...values })));
        }}
        PrimaryIcon={<Save />}
        primaryLabel="salva"
        variant="edit"
      />
    </PageWrapper>
  );
};

export default EditBookPage;
