import LogoHorizontal from '../../assets/logo-horizontal.svg';
import LogoVertical from '../../assets/logo-vertical.svg';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Logo = ({ variant }) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };
  return variant === 'vertical' ? (
    <img
      src={LogoVertical}
      alt="Logo Market Cubos"
      className="logo-vertical"
      onClick={handleHome}
    />
  ) : (
    <img
      src={LogoHorizontal}
      onClick={handleHome}
      alt="Logo Market Cubos"
      className="logo-horizontal"
    />
  );
};

export default Logo;
