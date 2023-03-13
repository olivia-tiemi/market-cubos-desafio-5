import { Typography } from '@mui/material';
import UserForm from '../../components/UserForm';
import Logo from '../../components/Logo';
import registrationSchema from '../../validations/registrationSchema';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import StyledRegisterForm from '../Login/style';
import {
  useSchemaStore,
  useInputArrayStore,
  useTypeArrayStore,
  usePlaceholderStore,
  useLabelArrayStore,
  useTypeStore,
} from '../../hooks/useStore';

function Register() {
  const updateSchema = useSchemaStore((state) => state.updateSchema);
  const updateInputArray = useInputArrayStore(
    (state) => state.updateInputArray
  );
  const updateTypeArray = useTypeArrayStore((state) => state.updateTypeArray);
  const updatePlaceholder = usePlaceholderStore(
    (state) => state.updatePlaceholder
  );
  const updateLabelArray = useLabelArrayStore(
    (state) => state.updateLabelArray
  );
  const updateType = useTypeStore((state) => state.updateType);
  updateSchema(registrationSchema);
  updateInputArray(['storeName', 'email', 'password', 'confirmPassword']);
  updateTypeArray(['text', 'email', 'password', 'password']);
  updatePlaceholder(['', '', '', '']);
  updateLabelArray(['Nome da loja', 'E-mail', 'Senha', 'Confirme sua senha']);
  updateType('registration');
  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      await axios.get('/loggedIn');
      navigate('/manage');
    } catch (error) {
      console.clear();
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="userform-container">
      <StyledRegisterForm>
        <Logo variant="vertical" />
        <Typography variant="form">Cadastre-se</Typography>
        <UserForm />
      </StyledRegisterForm>
    </div>
  );
}

export default Register;
