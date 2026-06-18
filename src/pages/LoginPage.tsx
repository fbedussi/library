import type React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { PageWrapper } from '../components/CommonComponents';
import TextField from '../components/TextField';
import type { TDispatch } from '../model/types';
import authActions from '../store/auth/actions';
import { selectUserId } from '../store/auth/selectors';
import styles from './loginPage.module.css';

const LoginPage: React.FC = () => {
  const userId = useSelector(selectUserId);
  const dispatch: TDispatch = useDispatch();
  const navigate = useNavigate();

  return userId ? (
    <Navigate to="/search" />
  ) : (
    <PageWrapper className={styles['login-page-wrapper']}>
      <form
        className={styles['login-form']}
        action={(formData: FormData) => {
          dispatch(
            authActions.login(
              {
                username: formData.get('username') as string,
                password: formData.get('password') as string,
                rememberMe: formData.get('rememberMe') === 'on',
              },
              navigate,
            ),
          );
        }}
      >
        <TextField name="username" id="username" label="nome utente" />
        <TextField
          name="password"
          id="password"
          type="password"
          label="password"
        />
        <label>
          <input type="checkbox" name="rememberMe" />
          ricordami
        </label>
        <div className={styles['button-wrapper']}>
          <button type="submit" className="btn">
            accedi
          </button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default LoginPage;
