import React from 'react'
import { ChevronLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
