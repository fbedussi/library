import type React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import {
  LinkNoStyle,
  PageWrapper,
  TopAppBar,
} from '../components/CommonComponents';
import HomeLink from '../components/HomeLink';
import ViewAllLink from '../components/ViewAllLink';
import Word from '../components/Word';
import Camera from '../icons/Camera';
import Close from '../icons/Close';
import Save from '../icons/Save';
import { convertRead } from '../libs/search';
import { bookFormValidation } from '../libs/validation';
import type { Book, FormData, SelectedField } from '../model/model';
import type { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import photosActions from '../store/photos/actions';
import { selectCurrentPhotoPath, selectWords } from '../store/photos/selectors';
import styles from './addBookPage.module.css';

const AddBookPage: React.FC = () => {
  const dispatch: TDispatch = useDispatch();

  const currentPhotoUrl = useSelector(selectCurrentPhotoPath);

  const blankInputs: FormData = {
    author: '',
    title: '',
    location: '',
    category: '',
    read: '',
  };
  const [initialValues, setInitialValues] = useState({ ...blankInputs });

  const [selectedField, setSelectedField] = useState('author' as SelectedField);

  const [lastAddedBook, setLastAddedBook] = useState<Book | undefined>();

  const words = useSelector(selectWords);

  return (
    <PageWrapper>
      <TopAppBar>
        <HomeLink />
        <h1>Inserimento</h1>
        <ViewAllLink />
      </TopAppBar>
      {!currentPhotoUrl && (
        <div className={styles['camera-button-wrapper']}>
          <p className={styles.instructions}>
            Se vuoi puoi fotografare la copertina, questo consentirà anche di
            estrarre automaticamente il titolo e l'autore (se presenti in
            copertina)
          </p>
          <LinkNoStyle to="/camera">
            <button className="btn" type="button">
              <Camera />
              fotografa la copertina
            </button>
          </LinkNoStyle>
        </div>
      )}

      <BookForm
        initialValues={initialValues}
        enableReinitialize={true}
        validate={bookFormValidation()}
        onSubmit={(values, reset) => {
          const book = convertRead({
            ...values,
            coverPath: currentPhotoUrl,
          });
          dispatch(booksActions.add(book)).then(
            newBook => newBook && setLastAddedBook(newBook),
          );
          dispatch(photosActions.resetPhotoData());
          reset();
        }}
        PrimaryIcon={<Save />}
        primaryLabel="salva"
        variant="edit"
      />

      {!!words.length && (
        <div>
          <div className={styles['reset-image-button-wrapper']}>
            <button
              type="button"
              data-testid="reset-photo-data-btn"
              onClick={() => {
                dispatch(photosActions.resetPhotoData());
              }}
            >
              <Close />
            </button>
          </div>
          <fieldset>
            <legend>
              Seleziona il campo e clicca sulle parole per aggiungerle al campo
              selezionato
            </legend>
            <input
              type="radio"
              id="selectedField-author"
              name="selectedField"
              value="author"
              onClick={() => setSelectedField('author')}
              checked={selectedField === 'author'}
            />
            <label htmlFor="selectedField-author">autore</label>
            <input
              type="radio"
              id="selectedField-title"
              name="selectedField"
              value="title"
              onClick={() => setSelectedField('title')}
              checked={selectedField === 'title'}
            />
            <label htmlFor="selectedField-title">titolo</label>
          </fieldset>
          <div className={styles['word-container']}>
            {words.map((word, index) => (
              <Word
                // biome-ignore lint/suspicious/noArrayIndexKey: it's ok
                key={`${word}_${index}`}
                word={word}
                onClick={() => {
                  setInitialValues({
                    ...initialValues,
                    [selectedField]: initialValues[selectedField].length
                      ? `${initialValues[selectedField]} ${word}`
                      : word,
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}

      {currentPhotoUrl && (
        <img className={styles.image} src={currentPhotoUrl} alt="bookCover" />
      )}

      {lastAddedBook && (
        <BookCard
          book={lastAddedBook}
          onDelete={() => setLastAddedBook(undefined)}
        />
      )}
    </PageWrapper>
  );
};

export default AddBookPage;
