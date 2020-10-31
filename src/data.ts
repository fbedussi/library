import db from './firebase'
import { Book } from './model/model'

const booksCollection = db.collection('books');

export const getBooksFromDB = (
	handleUpdate: (books: Book[]) => void,
	userId: string,
) => {
	booksCollection.doc(userId).onSnapshot(doc => {
		const dataFromDb = doc.data() as Book[];
		handleUpdate(dataFromDb);
	});
};
