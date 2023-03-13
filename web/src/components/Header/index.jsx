import { useNavigate } from 'react-router-dom';
import returnArrow from '../../assets/return-arrow.svg';
import Logo from '../../components/Logo';
import Usuario from '../Usuario';
import './style.css';

const Header = () => {
  const navigate = useNavigate();
  const handleReturn = () => {
    const currentPath = window.location.pathname;
    switch (currentPath) {
      case '/addproduct':
        navigate('/manage');
        break;
      case '/editproduct':
        navigate('/manage');
        break;
      case '/manage':
        navigate('/');
        break;
      case '/productinfo':
        navigate('/');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="header-container">
      <img
        src={returnArrow}
        alt=""
        onClick={handleReturn}
        className="return-arrow"
      />
      <Logo variant="horizontal" />
      <div className="usuario-container">
        <Usuario />
      </div>
    </div>
  );
};

export default Header;
