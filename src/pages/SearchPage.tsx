import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import { LinkNoStyle, PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import SortingBar from '../components/SortingBar'
import ViewAllLink from '../components/ViewAllLink'
import history from '../history'
import { useQuery } from '../hooks/useQuery'
import { search, sort } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { handleUrlQuery, isSearchKey, isSortingOrder } from '../libs/utils'
import { SearchCriteria, SortingOrder } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { CircularProgress, Fab, IconButton, Typography } from '../styleguide'
import { Add, MoreVert, Search } from '../styleguide/icons'
import theme from '../styleguide/theme'

const BooksList = styled.div`
	flex: 1;
	> * {
		margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	}
`;

const FabLink = styled(LinkNoStyle)`
	position: absolute;
	z-index: 1;
	bottom: ${pxToRem(theme.spacing(2))}rem;
	right: ${pxToRem(theme.spacing(2))}rem;
	margin: 0 auto;
	width: ${theme.spacing(7)}px;
`;

const SearchPage: React.FC = () => {
	const query = useQuery();
	const initialValues = {
		author: query.get('author') || '',
		title: query.get('title') || '',
		location: query.get('location') || '',
	};
	const [searchCriteria, setSearchCriteria] = useState(initialValues);
	const dispatch = useDispatch();
	const books = useSelector(selectBooks);
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
	const { t } = useTranslation();

	useEffect(() => {
		if (books.length) {
			dispatch(booksActions.initSearchAction());
			// trick to update state and rerender the component to apply seachCriteria to
			// newly loaded books
			setSearchCriteria({ ...searchCriteria });
		}
	}, [dispatch, books]);

	useEffect(() => {
		handleUrlQuery({
			key: sortingKey,
			order: sortingOrder,
			...searchCriteria,
		})
	}, [sortingKey, sortingOrder, searchCriteria]);

	const filteredBooks = search(searchCriteria) || [];

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<IconButton color="inherit" onClick={() => history.push('/settings')}>
						<MoreVert />
					</IconButton>
					{!books.length ? <CircularProgress color="secondary" /> : null}
					<Typography variant="h6">{t('app.search')}</Typography>
					<ViewAllLink />
				</ToolbarStyled>
			</TopAppBar>
			<BookForm
				initialValues={initialValues}
				onSubmit={values => {
					setSearchCriteria(values);
				}}
				PrimaryIcon={<Search />}
				primaryLabel={t('app.search')}
			/>

			<SortingBar
				sortingOrder={sortingOrder}
				setSortingOrder={setSortingOrder}
				sortingKey={sortingKey}
				setSortingKey={setSortingKey}
			/>

			<BooksList>
				{filteredBooks
					.filter(({ score }) => score && score < 0.8)
					.sort(
						(res1, res2) =>
							sort(res1.item[sortingKey], res2.item[sortingKey]) *
							(sortingOrder === 'asc' ? 1 : -1),
					)
					.map(({ item }) => (
						<BookCard key={item.id} book={item} />
					))}
			</BooksList>

			<FabLink to="/add">
				<Fab color="secondary" aria-label="add">
					<Add />
				</Fab>
			</FabLink>
		</PageWrapper>
	);
};

export default SearchPage;
