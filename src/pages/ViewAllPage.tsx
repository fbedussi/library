import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Autosizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import styled from 'styled-components'

import BackLink from '../components/BackLink'
import BookCard from '../components/BookCard'
import { ToolbarStyled, TopAppBar, TopBarPageWrapper } from '../components/CommonComponents'
import SortingBar from '../components/SortingBar'
import ViewAllLink from '../components/ViewAllLink'
import { sort } from '../libs/search'
import { SearchCriteria, SortingOrder } from '../model/model'
import { selectBooks } from '../store/books/selectors'
import { Typography } from '../styleguide'

const BooksList = styled.div`
	flex: 1;
	overflow: auto;

	.book-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const BookCardContainer = styled.div``;

const ViewAllPage: React.FC = () => {
	const books = useSelector(selectBooks);
	const { t } = useTranslation();
	const [sortingKey, setSortingKey] = useState(
		'author' as keyof SearchCriteria,
	);
	const [sortingOrder, setSortingOrder] = useState('asc' as SortingOrder);
	const listRef = useRef<HTMLDivElement>(null);
	const initialCellHeight = 160;
	const [cellHeight, _setCellHeight] = useState(initialCellHeight);

	useLayoutEffect(() => {
		const setHeights = () => {
			const cellHeight =
				listRef.current?.querySelector('.book-card')?.getBoundingClientRect()
					?.height || initialCellHeight;

			const gellGap = 16;
			_setCellHeight(Math.round(cellHeight) + gellGap);
		};

		setHeights();
		window.addEventListener('resize', setHeights);
		return window.removeEventListener('resize', setHeights);
	}, []);

	const booksToRender = books.slice().sort((res1, res2) => {
		return (
			sort(res1[sortingKey], res2[sortingKey]) *
			(sortingOrder === 'asc' ? 1 : -1)
		);
	});

	return (
		<TopBarPageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<BackLink />
					<Typography variant="h6">{t('app.viewAll')}</Typography>
					<ViewAllLink />
				</ToolbarStyled>
			</TopAppBar>

			<SortingBar
				sortingOrder={sortingOrder}
				setSortingOrder={setSortingOrder}
				sortingKey={sortingKey}
				setSortingKey={setSortingKey}
			/>

			<BooksList ref={listRef}>
				<Autosizer>
					{({ height, width }) => (
						<List
							height={height}
							itemCount={booksToRender.length}
							itemSize={cellHeight}
							width={width}
						>
							{({ index, style }: { index: number; style: Object }) => (
								<BookCardContainer style={style} key={booksToRender[index].id}>
									<BookCard book={booksToRender[index]} />
								</BookCardContainer>
							)}
						</List>
					)}
				</Autosizer>
			</BooksList>
		</TopBarPageWrapper>
	);
};

export default ViewAllPage;
