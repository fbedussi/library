import React, { useEffect, useState } from 'react';

import { FormData as BookData } from '../model/model';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './bookForm.module.css';

interface Props {
	initialValues: BookData;
	enableReinitialize?: boolean;
	validate?: (values: BookData) => { [k: string]: string };
	onSubmit: (values: BookData, reset: () => void) => void;
	onReset?: () => void;
	PrimaryIcon: React.ReactElement;
	primaryLabel: string;
	className?: string;
	variant: 'search' | 'edit';
}

const emptyValues: BookData = { author: '', title: '', location: '', category: '' };

type State = {
	resetKey: number;
	defaults: BookData;
	errors: { [k: string]: string };
};

const BookForm: React.FC<Props> = ({
	initialValues,
	enableReinitialize,
	validate,
	onSubmit,
	onReset,
	PrimaryIcon,
	primaryLabel,
	className,
	variant,
}) => {
	const [{ resetKey, defaults, errors }, setState] = useState<State>({
		resetKey: 0,
		defaults: initialValues,
		errors: {},
	});

	useEffect(() => {
		if (enableReinitialize) {
			setState(s => ({ ...s, resetKey: s.resetKey + 1, defaults: initialValues }));
		}
	}, [initialValues, enableReinitialize]);

	const reset = () =>
		setState(s => ({ resetKey: s.resetKey + 1, defaults: emptyValues, errors: {} }));

	const handleAction = (formData: FormData) => {
		const values: BookData = {
			author: formData.get('author')?.toString() ?? '',
			title: formData.get('title')?.toString() ?? '',
			location: formData.get('location')?.toString() ?? '',
			category: formData.get('category')?.toString() ?? '',
			read: formData.get('read')?.toString() ?? '',
			...(variant === 'search' && {
				showOnlyNotRead: formData.get('showOnlyNotRead') === 'on',
			}),
		};
		const validationErrors = validate ? validate(values) : {};
		if (Object.keys(validationErrors).length > 0) {
			setState(s => ({ ...s, errors: validationErrors }));
			return;
		}
		setState(s => ({ ...s, defaults: values, errors: {} }));
		onSubmit(values, reset);
	};

	return (
		<form
			key={resetKey}
			name="book-form"
			action={handleAction}
			onReset={() => {
				setState(s => ({ resetKey: s.resetKey + 1, defaults: emptyValues, errors: {} }));
				onReset?.();
			}}
			className={className}
		>
			<div className={styles['input-wrapper']}>
				<TextField
					id="author"
					name="author"
					variant="outlined"
					label="autore"
					defaultValue={defaults.author}
					error={!!errors.author}
					helperText={errors.author}
				/>

				<TextField
					id="title"
					name="title"
					variant="outlined"
					label="titolo"
					defaultValue={defaults.title}
					error={!!errors.title}
					helperText={errors.title}
				/>

				<TextField
					id="location"
					name="location"
					variant="outlined"
					label="collocazione"
					defaultValue={defaults.location}
					error={!!errors.location}
					helperText={errors.location}
				/>

				<TextField
					id="category"
					name="category"
					variant="outlined"
					label="categoria"
					defaultValue={defaults.category ?? ''}
				/>

				{variant === 'search' && (
					<FormControlLabel
						control={
							<Checkbox
								name="showOnlyNotRead"
								defaultChecked={!!defaults.showOnlyNotRead}
							/>
						}
						label="non letto"
					/>
				)}

				{variant === 'edit' && (
					<FormControl>
						<FormLabel>letto</FormLabel>
						<RadioGroup name="read" defaultValue={defaults.read ?? ''} row>
							<FormControlLabel
								value="true"
								control={<Radio />}
								label="sì"
							/>
							<FormControlLabel
								value="false"
								control={<Radio />}
								label="no"
							/>
							<FormControlLabel
								value=""
								control={<Radio />}
								label="non so"
							/>
						</RadioGroup>
					</FormControl>
				)}
			</div>
			<div className={styles['buttons-wrapper']}>
				<Button
					variant="contained"
					color="primary"
					size="large"
					startIcon={PrimaryIcon}
					type="submit"
				>
					{primaryLabel}
				</Button>
				<Button
					variant="outlined"
					color="primary"
					size="large"
					startIcon={<Close />}
					type="reset"
				>
					reset
				</Button>
			</div>
		</form>
	);
};

export default BookForm;
