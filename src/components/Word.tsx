import { Chip } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import styles from './word.module.css';

const Word: React.FC<{ word: string; onClick: () => void }> = ({
  word,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Chip
      data-testid="word"
      className={`${styles.chip}${clicked ? ` ${styles.clicked}` : ''}`}
      label={word}
      onClick={() => {
        setClicked(true);
        onClick();
      }}
    />
  );
};

export default Word;
