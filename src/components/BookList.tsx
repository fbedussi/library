import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

import { Book, SearchCriteria } from '../model/model';
import BookCard from './BookCard';

const BookCardContainer = styled.div``;

const BooksList: React.FC<{
	books: Book[];
	sortingKey?: keyof SearchCriteria;
	selectedLetter?: string;
	width: number;
	height: number;
}> = ({ books, sortingKey, selectedLetter, width, height }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const listRef = useRef<List>(null);

	const initialCellHeight = 160;
	const [cellHeight, _setCellHeight] = useState(initialCellHeight);

	useEffect(() => {
		if (!sortingKey || !selectedLetter) {
			return;
		}

		if (sortingKey !== 'showOnlyNotRead') {
			const itemIndex = books.findIndex(
				book => !sortingKey || book[sortingKey][0] >= selectedLetter,
			);
			listRef.current?.scrollToItem(itemIndex);
		}
	}, [selectedLetter, books, sortingKey]);

	useLayoutEffect(() => {
		const setHeights = () => {
			const cellHeight =
				containerRef.current
					?.querySelector('.book-card')
					?.getBoundingClientRect()?.height || initialCellHeight;

			const gellGap = 16;
			_setCellHeight(Math.round(cellHeight) + gellGap);
		};

		setHeights();
		window.addEventListener('resize', setHeights);
		return window.removeEventListener('resize', setHeights);
	}, []);

	return (
		<List
			ref={listRef}
			height={Math.min(height, cellHeight * books.length)}
			itemCount={books.length}
			itemSize={cellHeight}
			width={width}
		>
			{({ index, style }: { index: number; style: Object }) => (
				<BookCardContainer
					className="book-card-container"
					style={style}
					key={books[index].id}
				>
					<BookCard book={books[index]} />
				</BookCardContainer>
			)}
		</List>
	);
};

export default BooksList;
