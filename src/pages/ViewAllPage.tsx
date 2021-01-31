import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import history from '../history'
import { useQuery } from '../hooks/useQuery'
import { sort } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { genCharArray, isSearchKey, isSortingOrder } from '../libs/utils'
import { SearchCriteria, SortingOrder } from '../model/model'
import { selectBooks } from '../store/books/selectors'
import { Typography } from '../styleguide'
import theme from '../styleguide/theme'

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
		const params = new URLSearchParams();
		if (sortingKey) {
			params.append('key', sortingKey);
		} else {
			params.delete('key');
		}
		if (sortingOrder) {
			params.append('order', sortingOrder);
		} else {
			params.delete('order');
		}
		if (selectedLetter) {
			params.append('letter', selectedLetter);
		} else {
			params.delete('letter');
		}
		history.push({ search: params.toString() });
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
		const itemIndex = booksToRender.findIndex(
			book => book[sortingKey][0] >= selectedLetter,
		);
		listRef.current?.scrollToItem(itemIndex);
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
