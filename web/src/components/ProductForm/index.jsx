import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerProduct, updateProduct } from '../../api';
import useFormConfig from '../../hooks/useFormConfig';
import {
  useProductStore,
  useRegisterStore,
  useSetValueStore,
  useTriggerStore,
  useTypeStore,
} from '../../hooks/useStore';
import { errorToast, successToast } from '../../utils/toastify';
import AddModal from '../AddModal';
import { CustomButton } from '../CustomButton';
import EditModal from '../EditRemoveModal';
import Header from '../Header';
import Categories from './Categories';
import Description from './Description';
import Photo from './Photo';
import Price from './Price';
import Stock from './Stock';
import './style.css';
import Title from './Title';

const ProductForm = () => {
  const navigate = useNavigate();
  const storedProduct = useProductStore((state) => state.product);
  const updateRegister = useRegisterStore((state) => state.updateRegister);
  const updateSetValue = useSetValueStore((state) => state.updateSetValue);
  const updateTrigger = useTriggerStore((state) => state.updateTrigger);
  const type = useTypeStore((state) => state.type);
  const [openEditModal, setOpenEditModal] = useState(() => false);
  const [openAddModal, setOpenAddModal] = useState(() => false);
  const { register, handleSubmit, errors, setValue, reset, trigger } =
    useFormConfig();
  updateRegister(register);
  updateSetValue(setValue);
  updateTrigger(trigger);

  if (type === 'edit' && !storedProduct.user) {
    window.location.href = '/manage';
  }

  const onSubmitHandler = async (product) => {
    product.sold = 0;
    try {
      if (type === 'add') {
        await registerProduct(product);
        setOpenAddModal(true);
      } else {
        await updateProduct(storedProduct.id, product);
        successToast('Informações editadas com sucesso.');
        setTimeout(() => {
          navigate('/manage');
        }, 1000);
      }
      reset();
    } catch (error) {
      navigate('/signin');
      errorToast(error);
    }
  };

  const handleCancel = () => {
    if (type === 'edit') setOpenEditModal(true);
    else navigate('/manage');
  };

  return (
    <div className="product-container">
      <Header />
      <div className="page-container">
        <div className="content-container">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Typography variant="h5" marginBottom="24px">
              {type === 'add' ? 'Adicionar novo produto' : 'Editar produto'}
            </Typography>
            <div className="title-categories">
              <Title type={type} errors={errors} />
              <Categories errors={errors} />
            </div>
            <div className="description">
              <Description errors={errors} />
            </div>
            <div className="price-stock">
              <Price errors={errors} />
              <Stock type={type} errors={errors} />
            </div>
            <div className="photo">
              <Photo errors={errors} />
            </div>
            <div className="buttons">
              <CustomButton
                text={type === 'add' ? 'Publicar anúncio' : 'Salvar alterações'}
                type="submit"
              />
              <CustomButton
                text="Cancelar"
                type="button"
                handler={handleCancel}
                variant="white"
              />
            </div>
          </form>
        </div>
        {openEditModal && (
          <EditModal type="edit" onClose={() => setOpenEditModal(false)} />
        )}
        {openAddModal && <AddModal onClose={() => setOpenAddModal(false)} />}
        <ToastContainer style={{ fontSize: '1.6rem' }} />
      </div>
    </div>
  );
};

export default ProductForm;
