import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  type QueryDocumentSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  type UploadResult,
  uploadBytes,
} from 'firebase/storage';

import db, { storage } from './firebase';
import { b64toBlob } from './libs/photos';
import type { Base64, Book, DbBook, Id } from './model/model';

export type { UploadResult };

const booksCollection = collection(db, 'books');

export const searchBooksInDB = (
  handleUpdate: (books: Book[]) => void,
  searchCriteria: {
    author: string;
    title: string;
    location: string;
    userId: Id;
  },
) => {
  const { author, title, location, userId } = searchCriteria;
  const q = query(
    booksCollection,
    where('title', '>=', title),
    where('author', '>=', author),
    where('location', '>=', location),
    where('userId', '==', userId),
  );
  getDocs(q).then(querySnapshot => {
    const results: Book[] = [];
    querySnapshot.forEach((snapshot: QueryDocumentSnapshot) => {
      const dataFromDb = snapshot.data() as Book;
      results.push(dataFromDb);
    });
    handleUpdate(results);
  });
};

export const loadBooksFromDB = (
  handleUpdate: (books: Book[]) => void,
  userId: Id,
) => {
  const q = query(booksCollection, where('userId', '==', userId));
  getDocs(q).then(querySnapshot => {
    const results: Book[] = [];
    querySnapshot.forEach((snapshot: QueryDocumentSnapshot) => {
      const dataFromDb = snapshot.data() as Omit<Book, 'id'>;
      results.push({ ...dataFromDb, id: snapshot.id });
    });
    handleUpdate(results);
  });
};

export const addBookInDB = (
  book: Omit<Book, 'id'>,
  userId: Id,
): Promise<Book> => {
  if (book.read === undefined) {
    // no undefined are allowed on firebase
    delete book.read;
  }
  return addDoc(booksCollection, { ...book, userId }).then(docRef => {
    return { ...book, id: docRef.id };
  });
};

export const deleteBookInDB = (id: Id) => {
  return deleteDoc(doc(db, 'books', id));
};

export const updateBookInDB = (book: DbBook) => {
  // firebase does not accept undefined values
  if (book.read === undefined) {
    delete book.read;
  }
  return setDoc(doc(db, 'books', book.id), book);
};

export const uploadPhotoToBucket = (
  base64: Base64,
  contentType: string,
): Promise<UploadResult> => {
  const uuid = crypto.randomUUID();
  const pictureRef = ref(storage, `${uuid}.jpg`);
  return uploadBytes(pictureRef, b64toBlob(base64, contentType));
};

export const getPhotoUrl = (photoId: string) =>
  getDownloadURL(ref(storage, photoId));
