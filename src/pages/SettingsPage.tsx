import { ExitToApp, GetApp } from '@mui/icons-material';
import { Button, MenuItem, MenuList, Typography } from '@mui/material';
import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackLink from '../components/BackLink';
import {
  PageWrapper,
  ToolbarStyled,
  TopAppBar,
} from '../components/CommonComponents';
import type { TDispatch } from '../model/types';
import authActions from '../store/auth/actions';
import { selectBooks } from '../store/books/selectors';

const SettingsPage: React.FC = () => {
  const books = useSelector(selectBooks);
  const dispatch: TDispatch = useDispatch();

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
          <Typography variant="h6">Impostazioni</Typography>
          <div></div>
        </ToolbarStyled>
      </TopAppBar>

      <MenuList>
        <MenuItem>
          <a
            href={href}
            download="library.csv"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" startIcon={<GetApp />}>
              esporta dati
            </Button>
          </a>
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            startIcon={<ExitToApp />}
            onClick={() => dispatch(authActions.logout())}
          >
            logout
          </Button>
        </MenuItem>
      </MenuList>
    </PageWrapper>
  );
};

export default SettingsPage;
