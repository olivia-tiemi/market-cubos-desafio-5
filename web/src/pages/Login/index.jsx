import { Typography } from '@mui/material';
import UserForm from '../../components/UserForm';
import Logo from '../../components/Logo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import StyledLoginForm from './style';
import loginSchema from '../../validations/loginSchema';
import {
  useSchemaStore,
  useInputArrayStore,
  useTypeArrayStore,
  usePlaceholderStore,
  useLabelArrayStore,
  useTypeStore,
} from '../../hooks/useStore';
import './style.css';

function Login() {
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
  updateSchema(loginSchema);
  updateInputArray(['email', 'password']);
  updateTypeArray(['email', 'password']);
  updatePlaceholder(['exemplo@email.com', 'Insira sua senha']);
  updateLabelArray(['E-mail', 'Senha']);
  updateType('login');
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
      <StyledLoginForm>
        <Logo variant="vertical" />
        <Typography variant="form">Boas-vindas!</Typography>
        <Typography variant="caption" sx={{ marginTop: '8px' }}>
          Use seu e-mail e senha para acessar a conta
        </Typography>
        <UserForm />
      </StyledLoginForm>
    </div>
  );
}

export default Login;
