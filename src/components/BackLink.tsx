import { useNavigate } from 'react-router';
import ChevronLeft from '../icons/ChevronLeft';

const BackLink = () => {
  const navigate = useNavigate();
  return (
    <button
      className="icon-btn"
      type="button"
      aria-label="open drawer"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft />
    </button>
  );
};

export default BackLink;
