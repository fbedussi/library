import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Autosizer from 'react-virtualized-auto-sizer'
import styled from 'styled-components'

import BackLink from '../components/BackLink'
import BooksList from '../components/BookList'
import { ToolbarStyled, TopAppBar, TopBarPageWrapper } from '../components/CommonComponents'
import SortingBar from '../components/SortingBar'
import ViewAllLink from '../components/ViewAllLink'
import { useQuery } from '../hooks/useQuery'
import { sort } from '../libs/search'
import { pxToRem } from '../libs/styles'
import {
  genCharArray, handleUrlQuery, isSearchKey,
  isSortingOrder
} from '../libs/utils'
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

const BooksListWrapper = styled.div`
	flex: 1;
	overflow: auto;

	.book-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
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
	const letters = genCharArray('A', 'Z');

	useEffect(() => {
		handleUrlQuery({
			key: sortingKey,
			order: sortingOrder,
			letter: selectedLetter,
		});
	}, [sortingKey, sortingOrder, selectedLetter]);

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
				foundNumber={booksToRender.length}
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
				<BooksListWrapper ref={containerRef}>
					<Autosizer>
						{({ height, width }) => (
							<BooksList
								books={booksToRender}
								sortingKey={sortingKey}
								selectedLetter={selectedLetter}
								width={width}
								height={height}
							/>
						)}
					</Autosizer>
				</BooksListWrapper>
			</LettersAndList>
		</TopBarPageWrapper>
	);
};

export default ViewAllPage;
