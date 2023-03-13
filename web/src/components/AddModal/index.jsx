import { Typography } from '@mui/material';
import { CustomButton } from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import addSuccess from '../../assets/add-success.svg';
import '../EditRemoveModal/style.css';
import './style.css';

export default function AddModal({ id = 'close', onClose = () => {} }) {
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  const handleReturn = () => {
    navigate('/manage');
  };

  return (
    <div id={id} className="add-container" onClick={handleOutsideClick}>
      <div className="add-modal-container">
        <img src={addSuccess} alt="" />
        <Typography variant="h6" marginTop="32px" marginBottom="8px">
          O anuncio foi publicado
        </Typography>
        <Typography variant="caption" marginBottom="24px" color="#858585">
          O anúncio está ativo e o produto disponível para venda
        </Typography>
        <CustomButton text="Fechar" type="button" handler={handleReturn} />
      </div>
    </div>
  );
}
