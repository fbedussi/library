import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { PageWrapper } from '../components/CommonComponents'
import { pxToRem } from '../libs/styles'
import authActions from '../store/auth/actions'
import { selectUserId } from '../store/auth/selectors'
import { Button, FormControlLabel, Switch, TextField } from '../styleguide'
import theme from '../styleguide/theme'

const LoginPageWrapper = styled(PageWrapper)`
	justify-content: center;
`;

const LoginForm = styled(Form)`
	margin: 0 auto;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;

	> * {
		margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: 100%;
`;

const LoginPage: React.FC = () => {
	const userId = useSelector(selectUserId);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return userId ? (
		<Redirect to="/search" />
	) : (
		<LoginPageWrapper>
			<Formik
				initialValues={{
					username: '',
					password: '',
					rememberMe: false,
				}}
				onSubmit={values => {
					dispatch(authActions.login(values));
				}}
			>
				{() => {
					return (
						<LoginForm>
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
							<ButtonWrapper>
								<Button type="submit" color="primary" variant="contained">
									{t('app.login')}
								</Button>
							</ButtonWrapper>
						</LoginForm>
					);
				}}
			</Formik>
		</LoginPageWrapper>
	);
};

export default LoginPage;
