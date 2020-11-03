import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookCard from '../components/BookCard'
import { BottomAppBar, LinkNoStyle, ToolbarStyled } from '../components/CommonComponents'
import { search } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { SearchCriteria } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { Badge, Button, CircularProgress, Fab, IconButton, TextField } from '../styleguide'
import { Add, Book, Close, Search } from '../styleguide/icons'
import theme from '../styleguide/theme'

const PageWrapper = styled.div`
	padding: ${pxToRem(theme.spacing(1))}rem;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const InputWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(1))}rem;
`;

const ButtonsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${pxToRem(theme.spacing(1))}rem;
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;
`;

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
			<Formik
				initialValues={blankSearchCriteria}
				onSubmit={values => {
					setSearchCriteria(values);
				}}
				onReset={() => {
					setSearchCriteria(blankSearchCriteria);
				}}
			>
				{() => {
					return (
						<Form>
							<InputWrapper>
								<Field
									name="author"
									variant="outlined"
									as={TextField}
									label={t('app.author')}
								/>
								<Field
									name="title"
									variant="outlined"
									as={TextField}
									label={t('app.title')}
								/>
								<Field
									name="location"
									as={TextField}
									variant="outlined"
									label={t('app.location')}
								/>
							</InputWrapper>
							<ButtonsWrapper>
								<Button
									variant="contained"
									color="primary"
									size="large"
									startIcon={<Search />}
									type="submit"
								>
									{t('app.search')}
								</Button>
								<Button
									variant="outlined"
									color="primary"
									size="large"
									startIcon={<Close />}
									type="reset"
								>
									{t('app.reset')}
								</Button>
							</ButtonsWrapper>
						</Form>
					);
				}}
			</Formik>
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
