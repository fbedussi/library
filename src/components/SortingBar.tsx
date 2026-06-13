import React from 'react';

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
import styles from './sortingBar.module.css';

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
	return (
		<FormControl component="fieldset" name="sorting-bar" className={className}>
			<FormLabel component="legend">
				{foundNumber} risultati • ordina per
			</FormLabel>
			<div className={styles['sort-controls']}>
				<RadioGroup
					className={styles['sorting-radio-group']}
					name="sortingKey"
					value={sortingKey}
					onChange={(e, value) => setSortingKey(value as SortingKey)}
				>
					<FormControlLabel
						value="author"
						control={<Radio />}
						label="autore"
					/>
					<FormControlLabel
						value="title"
						control={<Radio />}
						label="titolo"
					/>
					<FormControlLabel
						value="location"
						control={<Radio />}
						label="coll."
					/>
					<FormControlLabel
						value="category"
						control={<Radio />}
						label="cat."
					/>
				</RadioGroup>
				<IconButton
					data-testid="sorting-btn"
					onClick={() =>
						setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc')
					}
				>
					{sortingOrder === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
				</IconButton>
			</div>
		</FormControl>
	);
};

export default SortingBar;
