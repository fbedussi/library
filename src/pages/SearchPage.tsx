import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'
import {
  BottomAppBar, LinkNoStyle, PageWrapper, ToolbarStyled
} from '../components/CommonComponents'
import { search } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { Badge, CircularProgress, Fab, IconButton } from '../styleguide'
import { Add, Book, Search } from '../styleguide/icons'
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
	top: -${pxToRem(theme.spacing(4))}rem;
	left: 0;
	right: 0;
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

			<BottomAppBar position="fixed" color="primary">
				<ToolbarStyled>
					{!books.length ? <CircularProgress color="secondary" /> : <div></div>}
					<FabLink to="/add">
						<Fab color="secondary" aria-label="add">
							<Add />
						</Fab>
					</FabLink>
					<IconButton color="inherit" disableRipple={true}>
						<Badge badgeContent={books.length} color="secondary">
							<Book />
						</Badge>
					</IconButton>
				</ToolbarStyled>
			</BottomAppBar>
		</PageWrapper>
	);
};

export default SearchPage;
