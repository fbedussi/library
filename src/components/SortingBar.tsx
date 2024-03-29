import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SortingKey, SortingOrder } from '../model/model';
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
	sortingKey: SortingKey;
	setSortingKey: (key: SortingKey) => void;
	sortingOrder: SortingOrder;
	setSortingOrder: (order: SortingOrder) => void;
	foundNumber: number;
	className?: string;
}

const SortingBar: React.FC<Props> = ({
	sortingKey,
	setSortingKey,
	sortingOrder,
	setSortingOrder,
	foundNumber,
	className,
}) => {
	const { t } = useTranslation();

	return (
		<FormControl component="fieldset" name="sorting-bar" className={className}>
			<FormLabel component="legend">
				{t('app.resultsFound', { foundNumber })} • {t('app.orderBy')}
			</FormLabel>
			<SortControls>
				<SortingRadioGroup
					name="sortingKey"
					value={sortingKey}
					onChange={(e, value) => setSortingKey(value as SortingKey)}
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
						label={t('app.locationShort')}
					/>
				</SortingRadioGroup>
				<IconButton
					data-testid="sorting-btn"
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
