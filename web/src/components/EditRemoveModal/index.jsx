import { Typography } from '@mui/material';
import { CustomButton } from '../CustomButton';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../hooks/useStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../../utils/toastify';
import { deleteProduct } from '../../api';
import './style.css';
import closeButton from '../../assets/close-button.svg';

export default function EditRemoveModal({
  type,
  id = 'close',
  onClose = () => {},
}) {
  const navigate = useNavigate();
  const product = useProductStore((state) => state.product);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  const handleReturn = () => {
    navigate('/manage');
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onClose();
      successToast('Produto removido com sucesso.');
      window.location.reload();
    } catch (error) {
      return errorToast(error);
    }
  };

  return (
    <div id={id} className="container" onClick={handleOutsideClick}>
      <div className="modal-container">
        <img src={closeButton} className="close" onClick={onClose} />
        <Typography variant="h6">
          {type === 'edit' ? 'Descartar alterações' : 'Remover produto'}
        </Typography>
        <Typography variant="bodyRegular">
          {type === 'edit'
            ? 'As alterações realizadas não foram salvas, deseja descartá-las?'
            : 'Tem certeza que deseja remover esse produto do estoque? A ação não poderá ser desfeita.'}
        </Typography>
        <div className="button-container">
          <CustomButton
            text={type === 'edit' ? 'Descartar' : 'Remover'}
            type="button"
            handler={type === 'edit' ? handleReturn : handleDelete}
          />
          <CustomButton
            text={type === 'edit' ? 'Continuar editando' : 'Cancelar'}
            type="button"
            handler={onClose}
            variant="white"
          />
        </div>
      </div>
      <ToastContainer style={{ fontSize: '1.6rem' }} />
    </div>
  );
}
