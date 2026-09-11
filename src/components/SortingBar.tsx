import type React from 'react';
import ArrowDownward from '../icons/ArrowDownward';
import ArrowUpward from '../icons/ArrowUpward';
import type { SortingKey, SortingOrder } from '../model/model';

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
    <fieldset>
      <legend>{foundNumber} risultati • ordina per</legend>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="author"
          checked={sortingKey === 'author'}
          onChange={() => setSortingKey('author')}
        />
        autore
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="title"
          checked={sortingKey === 'title'}
          onChange={() => setSortingKey('title')}
        />
        titolo
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="location"
          checked={sortingKey === 'location'}
          onChange={() => setSortingKey('location')}
        />
        coll.
      </label>
      <label>
        <input
          type="radio"
          name="sortingKey"
          value="category"
          checked={sortingKey === 'category'}
          onChange={() => setSortingKey('category')}
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
