import type React from 'react';
import ArrowDownward from '../icons/ArrowDownward';
import ArrowUpward from '../icons/ArrowUpward';
import type { SortingKey, SortingOrder } from '../model/model';
import styles from './sortingBar.module.css';

interface Props {
  sortingKey: SortingKey;
  setSortingKey: (key: SortingKey) => void;
  sortingOrder: SortingOrder;
  setSortingOrder: (order: SortingOrder) => void;
  foundNumber: number;
}

const SortingBar: React.FC<Props> = ({
  sortingKey,
  setSortingKey,
  sortingOrder,
  setSortingOrder,
  foundNumber,
}) => {
  return (
    <fieldset className={styles.container}>
      <legend>{foundNumber} risultati • ordina per</legend>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="author"
          checked={sortingKey === 'author'}
          onClick={() => setSortingKey('author')}
        />
        autore
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="title"
          checked={sortingKey === 'title'}
          onClick={() => setSortingKey('title')}
        />
        titolo
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="location"
          checked={sortingKey === 'location'}
          onClick={() => setSortingKey('location')}
        />
        coll.
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="category"
          checked={sortingKey === 'category'}
          onClick={() => setSortingKey('category')}
        />
        cat.
      </label>

      <button
        className="icon-btn"
        type="button"
        data-testid="sorting-btn"
        onClick={() => setSortingOrder(sortingOrder === 'asc' ? 'desc' : 'asc')}
      >
        {sortingOrder === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
      </button>
    </fieldset>
  );
};

export default SortingBar;
