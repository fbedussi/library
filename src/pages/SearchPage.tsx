import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import {
	LinkNoStyle,
	PageWrapper,
	ToolbarStyled,
	TopAppBar,
} from '../components/CommonComponents';
import ViewAllLink from '../components/ViewAllLink';
import { search, sort } from '../libs/search';
import { pxToRem } from '../libs/styles';
import { SearchCriteria, SortingOrder } from '../model/model';
import booksActions from '../store/books/actions';
import { selectBooks } from '../store/books/selectors';
import { CircularProgress, Fab, IconButton, Typography } from '../styleguide';
import { Add, MoreVert, Search } from '../styleguide/icons';
import theme from '../styleguide/theme';
import history from '../history';
import SortingBar from '../components/SortingBar';

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

const blankSearchCriteria: SearchCriteria = {
	author: '',
	title: '',
	location: '',
};

const SearchPage: React.FC = () => {
	const [searchCriteria, setSearchCriteria] = useState(blankSearchCriteria);
	const dispatch = useDispatch();
	const books = useSelector(selectBooks);
	const [sortingKey, setSortingKey] = useState(
		'author' as keyof SearchCriteria,
	);
	const [sortingOrder, setSortingOrder] = useState('asc' as SortingOrder);
	const { t } = useTranslation();

	useEffect(() => {
		books.length && dispatch(booksActions.initSearchAction());
	}, [dispatch, books]);

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
				initialValues={blankSearchCriteria}
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
