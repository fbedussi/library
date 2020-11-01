import db from './firebase'
import { Book, Id } from './model/model'

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
			querySnapshot.forEach(function (doc) {
				const dataFromDb = doc.data() as Omit<Book, 'id'>;
				results.push({ ...dataFromDb, id: doc.id });
			});
			debugger;
			handleUpdate(results);
		});
};
