import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { List, RowComponentProps, useListRef } from 'react-window';

import { Book, SearchCriteria } from '../model/model';
import BookCard from './BookCard';

const BooksList: React.FC<{
	books: Book[];
	sortingKey?: keyof SearchCriteria;
	selectedLetter?: string;
}> = ({ books, sortingKey, selectedLetter }) => {
	const listRef = useListRef(null);

	useEffect(() => {
		if (!sortingKey || !selectedLetter) {
			return;
		}

		if (sortingKey !== 'showOnlyNotRead') {
			const itemIndex = books.findIndex(
				book => {
					const field = book[sortingKey]
					const firstLetter = field ? field[0] : undefined
					return !sortingKey || (firstLetter && (firstLetter >= selectedLetter))
				},
			);
			listRef.current?.scrollToRow({ index: itemIndex });
		}
	}, [selectedLetter, books, sortingKey]);

	return (
		<List
			listRef={listRef}
			rowHeight={190}
			rowCount={books.length}
			rowProps={{}}
			rowComponent={({ index, style }: RowComponentProps) => (
				<div
					className="book-card-container"
					style={style}
					key={books[index].id}
				>
					<BookCard book={books[index]} />
				</div>
			)}
		/>
	);
};

export default BooksList;
