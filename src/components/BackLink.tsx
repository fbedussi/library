import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '../styleguide';
import { ChevronLeft } from '../styleguide/icons';

const BackLink = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft />
    </IconButton>
  );
};

export default BackLink;
