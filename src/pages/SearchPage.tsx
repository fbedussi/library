import Fuse from 'fuse.js'
import React, {
  useEffect, useMemo, useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import BookForm from '../components/BookForm'
import BooksList from '../components/BookList'
import { LinkNoStyle, ToolbarStyled, TopAppBar } from '../components/CommonComponents'
import SortingBar from '../components/SortingBar'
import ViewAllLink from '../components/ViewAllLink'
import history from '../history'
import { useQuery } from '../hooks/useQuery'
import { convertRead, search, sort } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { handleUrlQuery, isSearchKey, isSortingOrder } from '../libs/utils'
import {
  Book, SearchCriteria, SearchCriteriaForForm,
  SortingOrder
} from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import {
  CircularProgress, Fab, IconButton,
  Typography
} from '../styleguide'
import { Add, MoreVert, Search } from '../styleguide/icons'
import theme from '../styleguide/theme'

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
	const query = useQuery();
	const readParam = query.get('read') || undefined;
	const initialValues: SearchCriteriaForForm = {
		author: query.get('author') || '',
		title: query.get('title') || '',
		location: query.get('location') || '',
		read: readParam || '',
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
	const queryScrollTop = query.get('scrollTop');
	const defaultScrollTop = parseInt(queryScrollTop || '0');
	const scrollTopAtLanding = useRef(defaultScrollTop);
	const [scrollTop, setScrollTop] = useState(defaultScrollTop);
	const scrollableContainerRef = useRef<HTMLDivElement>(null);
	const [filteredBooks, setFilteredBooks] = useState<Fuse.FuseResult<Book>[]>();
	const { t } = useTranslation();

	useEffect(() => {
		if (scrollableContainerRef.current && filteredBooks) {
			scrollableContainerRef.current.scrollTop = scrollTopAtLanding.current;
		}
	}, [filteredBooks]);

	useEffect(() => {
		if (books.length) {
			dispatch(booksActions.initSearchAction());
			// trick to update state and rerender the component to apply seachCriteria to
			// newly loaded books
			setSearchCriteria(searchCriteria => ({ ...searchCriteria }));
		}
	}, [dispatch, books]);

	useEffect(() => {
		handleUrlQuery({
			key: sortingKey,
			order: sortingOrder,
			scrollTop: scrollTop.toString(),
			author: searchCriteria.author,
			title: searchCriteria.title,
			location: searchCriteria.location,
			read: !!searchCriteria.read,
		});
	}, [sortingKey, sortingOrder, searchCriteria, scrollTop]);

	useEffect(() => {
		setFilteredBooks(search(convertRead(searchCriteria)));
	}, [searchCriteria]);

	const booksToShow = useMemo(() => {
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
	}, [filteredBooks, sortingKey, sortingOrder]);

	return (
		<Wrapper
			ref={scrollableContainerRef}
			onScroll={e => {
				setScrollTop(e.currentTarget.scrollTop);
			}}
		>
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
			<BookFormAndSortingBar>
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
