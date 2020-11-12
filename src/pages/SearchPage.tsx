import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import { LinkNoStyle, PageWrapper, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import ViewAllLink from '../components/ViewAllLink'
import { search } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { CircularProgress, Fab, Typography } from '../styleguide'
import { Add, Search } from '../styleguide/icons'
import theme from '../styleguide/theme'

const BooksList = styled.div`
	flex: 1;
	overflow: auto;
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
	const { t } = useTranslation();

	useEffect(() => {
		books.length && dispatch(booksActions.initSearchAction());
	}, [dispatch, books]);

	const filteredBooks = search(searchCriteria) || [];

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
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

			<BooksList>
				{filteredBooks
					.filter(({ score }) => score && score < 0.8)
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
