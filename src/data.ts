import db from './firebase'
import { Book, DbBook, Id } from './model/model'

const booksCollection = db.collection('books');

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
	booksCollection
		.where('title', '>=', title)
		.where('author', '>=', author)
		.where('location', '>=', location)
		.where('userId', '==', userId)
		.get()
		.then(function (querySnapshot) {
			let results: Book[] = [];
			querySnapshot.forEach(function (doc) {
				const dataFromDb = doc.data() as Book;
				results.push(dataFromDb);
			});
			handleUpdate(results);
		});
};

export const loadBooksFromDB = (
	handleUpdate: (books: Book[]) => void,
	userId: Id,
) => {
	booksCollection
		.where('userId', '==', userId)
		.get()
		.then(function (querySnapshot) {
			let results: Book[] = [];
			querySnapshot.forEach(doc => {
				const dataFromDb = doc.data() as Omit<Book, 'id'>;
				results.push({ ...dataFromDb, id: doc.id });
			});
			handleUpdate(results);
		});
};

export const addBookInDB = (
	book: Omit<Book, 'id'>,
	userId: Id,
): Promise<Book> => {
	return booksCollection.add({ ...book, userId }).then(doc => {
		return { ...book, id: doc.id };
	});
};

export const deleteBookInDB = (id: Id) => {
	return booksCollection.doc(id).delete();
};

export const updateBookInDB = (book: DbBook) => {
	return booksCollection.doc(book.id).set(book);
};
