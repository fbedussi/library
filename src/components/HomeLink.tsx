import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '../styleguide';
import { Search } from '../styleguide/icons';

const HomeLink = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={() => navigate('/')}
    >
      <Search />
    </IconButton>
  );
};

export default HomeLink;
