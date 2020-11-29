import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BackLink from '../components/BackLink';

import {
	PageWrapper,
	ToolbarStyled,
	TopAppBar,
} from '../components/CommonComponents';
import authActions from '../store/auth/actions';
import { selectBooks } from '../store/books/selectors';
import { Button, MenuItem, Typography } from '../styleguide';
import { ExitToApp, GetApp } from '../styleguide/icons';

const SettingsPage: React.FC = () => {
	const books = useSelector(selectBooks);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const csv = ['"Author";"Title";"Location"']
		.concat(
			books.map(
				({ author, title, location }) => `"${author}";"${title}";"${location}"`,
			),
		)
		.join('\n');

	const href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;

	return (
		<PageWrapper>
			<TopAppBar position="fixed" color="primary">
				<ToolbarStyled>
					<BackLink />
					<Typography variant="h6">{t('app.settings')}</Typography>
					<div></div>
				</ToolbarStyled>
			</TopAppBar>

			<MenuItem>
				<a href={href} download="library.csv" target="_blank" rel="noreferrer">
					<Button variant="contained" startIcon={<GetApp />}>
						{t('app.export')}
					</Button>
				</a>
			</MenuItem>
			<MenuItem>
				<Button
					variant="contained"
					startIcon={<ExitToApp />}
					onClick={() => dispatch(authActions.logout())}
				>
					{t('app.logout')}
				</Button>
			</MenuItem>
		</PageWrapper>
	);
};

export default SettingsPage;
