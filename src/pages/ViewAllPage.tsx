import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SearchCriteria, SortingOrder } from '../model/model'
import { ToolbarStyled, TopAppBar, TopBarPageWrapper } from '../components/CommonComponents'
import { genCharArray, handleUrlQuery, isSearchKey, isSortingOrder } from '../libs/utils'

import Autosizer from 'react-virtualized-auto-sizer'
import BackLink from '../components/BackLink'
import BookCard from '../components/BookCard'
import { FixedSizeList as List } from 'react-window'
import SortingBar from '../components/SortingBar'
import { Typography } from '../styleguide'
import ViewAllLink from '../components/ViewAllLink'
import { pxToRem } from '../libs/styles'
import { selectBooks } from '../store/books/selectors'
import { sort } from '../libs/search'
import styled from 'styled-components'
import theme from '../styleguide/theme'
import { useQuery } from '../hooks/useQuery'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const LettersAndList = styled.div`
	display: flex;
	width: 100%;
	flex: 1;
	overflow: hidden;
`;

const Letters = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding-right: ${pxToRem(theme.spacing(2))}rem;
	overflow-y: auto;
`;

const Letter = styled.button`
	padding: ${pxToRem(theme.spacing(1))}rem 0;

	&.active {
		color: ${theme.palette.secondary.main};
		font-weight: bold;
	}
`;

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
	const query = useQuery();
	const books = useSelector(selectBooks);
	const { t } = useTranslation();
	const queryKey = query.get('key');
	const defaultSortingKey: keyof SearchCriteria = 'author';
	const [sortingKey, setSortingKey] = useState(
		isSearchKey(queryKey) ? queryKey : defaultSortingKey,
	);
	const queryOrder = query.get('order');
	const defaultSortingOrder: SortingOrder = 'asc';
	const [sortingOrder, setSortingOrder] = useState(
		isSortingOrder(queryOrder) ? queryOrder : defaultSortingOrder,
	);
	const [selectedLetter, setSelectedLetter] = useState(
		query.get('letter') || '',
	);
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<List>(null);
	const initialCellHeight = 160;
	const [cellHeight, _setCellHeight] = useState(initialCellHeight);
	const letters = genCharArray('A', 'Z');

	useEffect(() => {
		handleUrlQuery({ key: sortingKey, order: sortingOrder, letter: selectedLetter })
	}, [sortingKey, sortingOrder, selectedLetter]);

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

	const booksToRender = books.slice().sort((res1, res2) => {
		return (
			sort(res1[sortingKey], res2[sortingKey]) *
			(sortingOrder === 'asc' ? 1 : -1)
		);
	});

	useEffect(() => {
		if (sortingKey !== 'read') {
			const itemIndex = booksToRender.findIndex(
				book => book[sortingKey][0] >= selectedLetter,
			);
			listRef.current?.scrollToItem(itemIndex);
		}
	}, [selectedLetter, booksToRender, sortingKey]);

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

			<LettersAndList>
				<Letters>
					{letters.map(letter => (
						<Letter
							key={letter}
							className={selectedLetter === letter ? 'active' : ''}
							onClick={() => setSelectedLetter(letter)}
						>
							{letter}
						</Letter>
					))}
				</Letters>
				<BooksList ref={containerRef}>
					<Autosizer>
						{({ height, width }) => (
							<List
								ref={listRef}
								height={height}
								itemCount={booksToRender.length}
								itemSize={cellHeight}
								width={width}
							>
								{({ index, style }: { index: number; style: Object }) => (
									<BookCardContainer
										style={style}
										key={booksToRender[index].id}
									>
										<BookCard book={booksToRender[index]} />
									</BookCardContainer>
								)}
							</List>
						)}
					</Autosizer>
				</BooksList>
			</LettersAndList>
		</TopBarPageWrapper>
	);
};

export default ViewAllPage;
