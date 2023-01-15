import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import BookForm from '../components/BookForm';
import BooksList from '../components/BookList';
import {
	LinkNoStyle,
	ToolbarStyled,
	TopAppBar,
} from '../components/CommonComponents';
import SortingBar from '../components/SortingBar';
import ViewAllLink from '../components/ViewAllLink';
import { useQuery } from '../hooks/useQuery';
import { convertRead, search, sort } from '../libs/search';
import { pxToRem } from '../libs/styles';
import { isSearchKey, isSortingOrder } from '../libs/utils';
import {
	Book,
	SearchCriteria,
	FormData,
	SortingOrder,
	SortingKey,
} from '../model/model';
import { TDispatch } from '../model/types';
import booksActions from '../store/books/actions';
import { selectBooks } from '../store/books/selectors';
import { CircularProgress, Fab, IconButton, Typography } from '../styleguide';
import { Add, MoreVert, Search } from '../styleguide/icons';
import theme from '../styleguide/theme';

const Wrapper = styled.div`
	.book-card-container {
		padding: 0 1rem;
	}
`;

const BookFormAndSortingBar = styled.div`
	padding: 80px 1rem 0;
`;

const FabLink = styled(LinkNoStyle)`
	position: fixed;
	z-index: 1;
	bottom: ${pxToRem(theme.spacing(2))}rem;
	right: ${pxToRem(theme.spacing(2))}rem;
	margin: 0 auto;
	width: ${theme.spacing(7)}px;
`;

const SearchPage: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const author = searchParams.get('author') || '';
	const title = searchParams.get('title') || '';
	const location = searchParams.get('location') || '';
	const showOnlyNotRead = searchParams.get('showOnlyNotRead') || '';
	const searchCriteria: FormData = useMemo(
		() => ({
			author,
			title,
			location,
			showOnlyNotRead: showOnlyNotRead === 'true',
		}),
		[author, title, location, showOnlyNotRead],
	);

	const dispatch: TDispatch = useDispatch();

	const books = useSelector(selectBooks);

	const queryScrollTop = searchParams.get('scrollTop');
	const defaultScrollTop = parseInt(queryScrollTop || '0');
	const scrollTopAtLanding = useRef(defaultScrollTop);
	const scrollableContainerRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation();

	useEffect(() => {
		dispatch(booksActions.initSearchAction());
	}, [dispatch]);

	const setSearchCriteria = (values: FormData) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (values.author === '') {
			searchParams.delete('author');
		} else {
			searchParams.set('author', values.author);
		}

		if (values.title === '') {
			searchParams.delete('title');
		} else {
			searchParams.set('title', values.title);
		}

		if (values.location === '') {
			searchParams.delete('location');
		} else {
			searchParams.set('location', values.location);
		}

		if (!values.showOnlyNotRead) {
			searchParams.delete('showOnlyNotRead');
		} else {
			searchParams.set('showOnlyNotRead', 'true');
		}

		setSearchParams(searchParams, { replace: true });
	};

	const sortingKey = (searchParams.get('key') || 'author') as SortingKey;

	const setSortingKey = (sortingKey: SortingKey) => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('key', sortingKey);
		setSearchParams(searchParams, { replace: true });
	};

	const sortingOrder = (searchParams.get('order') || 'asc') as SortingOrder;

	const setSortingOrder = (sortingOrder: SortingOrder) => {
		searchParams.set('order', sortingOrder);
		setSearchParams(searchParams, { replace: true });
	};

	const booksToShow = useMemo(() => {
		const filteredBooks: Fuse.FuseResult<Book>[] | undefined = search(
			convertRead(searchCriteria),
		);
		const books =
			filteredBooks?.filter(({ score }) => {
				return score !== undefined && score < 0.8;
			}) || [];

		books.sort(
			(res1, res2) =>
				sort(res1.item[sortingKey], res2.item[sortingKey]) *
				(sortingOrder === 'asc' ? 1 : -1),
		);

		return books.map(({ item }) => item);
	}, [searchCriteria, sortingKey, sortingOrder, books]);

	useEffect(() => {
		if (scrollableContainerRef.current && booksToShow.length) {
			scrollableContainerRef.current.scrollTop = scrollTopAtLanding.current;
		}
	}, [booksToShow]);

	const navigate = useNavigate();

	return (
		<Wrapper
			// trick to rerender the component to apply searchCriteria to newly loaded books
			key={books.length.toString()}
			data-testid="search-page"
			ref={scrollableContainerRef}
			onScroll={e => {
				const searchParams = new URLSearchParams();

				searchParams.set('scrollTop', e.currentTarget.scrollTop.toString());
				setSearchParams(searchParams, { replace: true });
			}}
		>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<IconButton color="inherit" onClick={() => navigate('/settings')}>
						<MoreVert />
					</IconButton>
					{!books.length ? <CircularProgress color="secondary" /> : null}
					<Typography variant="h6">{t('app.search')}</Typography>
					<ViewAllLink />
				</ToolbarStyled>
			</TopAppBar>
			<BookFormAndSortingBar>
				<BookForm
					initialValues={searchCriteria}
					onSubmit={values => {
						setSearchCriteria(values);
					}}
					onReset={() => {
						searchParams.delete('author');
						searchParams.delete('title');
						searchParams.delete('location');
						searchParams.delete('showOnlyNotRead');
						setSearchParams(searchParams);
					}}
					PrimaryIcon={<Search />}
					primaryLabel={t('app.search')}
					variant="search"
				/>

				<SortingBar
					sortingOrder={sortingOrder}
					setSortingOrder={setSortingOrder}
					sortingKey={sortingKey}
					setSortingKey={setSortingKey}
					foundNumber={booksToShow.length}
				/>
			</BookFormAndSortingBar>

			<BooksList
				books={booksToShow}
				width={window.innerWidth}
				height={window.innerHeight}
			/>

			<FabLink to="/add">
				<Fab color="secondary" aria-label="add">
					<Add />
				</Fab>
			</FabLink>
		</Wrapper>
	);
};

export default SearchPage;
