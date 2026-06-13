import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { PageWrapper } from '../components/CommonComponents';
import { TDispatch } from '../model/types';
import authActions from '../store/auth/actions';
import { selectUserId } from '../store/auth/selectors';
import { Button, FormControlLabel, Switch, TextField } from '../styleguide';
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
          dispatch(authActions.login({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            rememberMe: formData.get('rememberMe') === 'on',
          }, navigate));
        }}
      >
        <TextField
          name="username"
          id="username"
          label="nome utente"
          variant="outlined"
        />
        <TextField
          name="password"
          id="password"
          type="password"
          label="password"
          variant="outlined"
        />
        <FormControlLabel
          control={<Switch name="rememberMe" />}
          label="ricordami"
        />
        <div className={styles['button-wrapper']}>
          <Button type="submit" color="primary" variant="contained">
            accedi
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default LoginPage;
