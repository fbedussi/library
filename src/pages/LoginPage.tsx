import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch: TDispatch = useDispatch();

  const navigate = useNavigate();

  return userId ? (
    <Navigate to="/search" />
  ) : (
    <PageWrapper className={styles['login-page-wrapper']}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          rememberMe: false,
        }}
        onSubmit={values => {
          dispatch(authActions.login(values, navigate));
        }}
      >
        {() => {
          return (
            <Form className={styles['login-form']}>
              <Field
                as={TextField}
                name="username"
                id="username"
                label={t('app.username')}
                variant="outlined"
              />
              <Field
                as={TextField}
                name="password"
                id="password"
                type="password"
                label={t('app.password')}
                variant="outlined"
              />
              <FormControlLabel
                control={<Field as={Switch} name="rememberMe" />}
                label={t('app.rememberMe')}
              />
              <div className={styles['button-wrapper']}>
                <Button type="submit" color="primary" variant="contained">
                  {t('app.login')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};

export default LoginPage;
