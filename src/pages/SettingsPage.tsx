import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackLink from '../components/BackLink';
import { PageWrapper, TopAppBar } from '../components/CommonComponents';
import ExitToApp from '../icons/ExitToApp';
import GetApp from '../icons/GetApp';
import type { TDispatch } from '../model/types';
import authActions from '../store/auth/actions';
import { selectBooks } from '../store/books/selectors';
import styles from './settingsPage.module.css';

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
      <TopAppBar>
        <BackLink />
        <h1>Impostazioni</h1>
        <div></div>
      </TopAppBar>

      <div className={styles.container}>
        <a href={href} download="library.csv" target="_blank" rel="noreferrer">
          <button type="button" className="btn">
            <GetApp />
            esporta dati
          </button>
        </a>
        <div>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(authActions.logout())}
          >
            <ExitToApp />
            logout
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
