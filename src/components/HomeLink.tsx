import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

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
