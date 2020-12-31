import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SearchCriteria, SortingOrder } from '../model/model';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
} from '../styleguide';
import { ArrowDownward, ArrowUpward } from '../styleguide/icons';

const SortControls = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

const SortingRadioGroup = styled(RadioGroup)`
	flex-direction: row;
	.MuiFormControlLabel-label {
		font-size: 0.8rem;
		font-size: 0.8rem;
	}
`;

interface Props {
	sortingKey: keyof SearchCriteria;
	setSortingKey: (key: keyof SearchCriteria) => void;
	sortingOrder: SortingOrder;
	setSortingOrder: (order: SortingOrder) => void;
}

const SortingBar: React.FC<Props> = ({
	sortingKey,
	setSortingKey,
	sortingOrder,
	setSortingOrder,
}) => {
	const { t } = useTranslation();

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{t('app.orderBy')}</FormLabel>
			<SortControls>
				<SortingRadioGroup
					name="sortingKey"
					value={sortingKey}
					onChange={(e, value) => setSortingKey(value as keyof SearchCriteria)}
				>
					<FormControlLabel
						value="author"
						control={<Radio />}
						label={t('app.author')}
					/>
					<FormControlLabel
						value="title"
						control={<Radio />}
						label={t('app.title')}
					/>
					<FormControlLabel
						value="location"
						control={<Radio />}
						label={t('app.location')}
					/>
				</SortingRadioGroup>
				<IconButton
					onClick={() =>
						setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc')
					}
				>
					{sortingOrder === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
				</IconButton>
			</SortControls>
		</FormControl>
	);
};

export default SortingBar;
