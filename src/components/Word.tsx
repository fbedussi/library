import React, { useState } from 'react';

import { Chip } from '@mui/material';
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
