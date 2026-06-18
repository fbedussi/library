import type React from 'react';
import { useState } from 'react';
import styles from './word.module.css';

const Word: React.FC<{ word: string; onClick: () => void }> = ({
  word,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      type="button"
      data-testid="word"
      className={`${styles.chip}${clicked ? ` ${styles.clicked}` : ''}`}
      onClick={() => {
        setClicked(true);
        onClick();
      }}
    >
      {word}
    </button>
  );
};

export default Word;
