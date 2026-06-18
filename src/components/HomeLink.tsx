import { useNavigate } from 'react-router';
import Search from '../icons/Search';

const HomeLink = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="open drawer"
      onClick={() => navigate('/')}
    >
      <Search />
    </button>
  );
};

export default HomeLink;
