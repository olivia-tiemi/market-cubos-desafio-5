import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser, userLogin } from '../../api';
import useFormConfig from '../../hooks/useFormConfig';
import {
  useLoggedStore,
  useRegisterStore,
  useInputArrayStore,
  useTypeArrayStore,
  usePlaceholderStore,
  useLabelArrayStore,
  useTypeStore,
} from '../../hooks/useStore';
import { errorToast, successToast } from '../../utils/toastify';
import { CustomButton } from '../CustomButton';
import Input from '../Input';
import CustomError from './CustomError';
import './style.css';

const UserForm = () => {
  const { handleSubmit, register, errors, reset } = useFormConfig();
  const navigate = useNavigate();
  const updateUser = useLoggedStore((state) => state.updateUser);
  const updateRegister = useRegisterStore((state) => state.updateRegister);
  updateRegister(register);
  const inputArray = useInputArrayStore((state) => state.inputArray);
  const typeArray = useTypeArrayStore((state) => state.typeArray);
  const placeholderArray = usePlaceholderStore((state) => state.placeholder);
  const labelArray = useLabelArrayStore((state) => state.labelArray);
  const type = useTypeStore((state) => state.type);

  const onSubmitHandler = async (user) => {
    const { confirmPassword: _, ...userData } = user;
    let path;
    try {
      if (type === 'registration') {
        const { data } = await registerUser(userData);
        updateUser(data);
        path = '/signin';
      } else {
        const { data } = await userLogin(userData);
        updateUser(data);
        path = '/manage';
      }
      successToast('Seja bem-vindo(a)!');
      setTimeout(() => {
        navigate(path);
      }, 1000);
      reset();
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="form-container">
      <div className={`form-label-input${type === 'login' ? ' login' : ''}`}>
        {inputArray.map((input, index) => {
          return (
            <div key={index} className="label-input">
              <Input
                variableName={input}
                label={labelArray[index]}
                type={typeArray[index]}
                placeholder={placeholderArray[index]}
                defaultValue=""
                width="382px"
              />
              <CustomError errors={Object.entries(errors)} input={input} />
            </div>
          );
        })}
      </div>
      {type === 'registration' && (
        <Typography variant="caption" sx={{ marginBottom: '24px' }}>
          Ao criar uma conta, você concorda com a nossa <br />
          <a href="#">Política de Privacidade</a> e{' '}
          <a href="#">Termos de serviço</a>
        </Typography>
      )}
      <CustomButton
        text={type === 'registration' ? 'Criar Conta' : 'Fazer login'}
        type="submit"
      />
      <Typography variant="bodyRegular" sx={{ marginTop: '32px' }}>
        {type === 'login' ? 'Não possui conta? ' : 'Já tem uma conta? '}
        <Link to={type === 'login' ? '/signup' : '/signin'}>
          {type === 'login' ? 'Cadastrar' : 'Fazer login'}
        </Link>
      </Typography>
      <ToastContainer style={{ fontSize: '1.6rem' }} />
    </form>
  );
};

export default UserForm;
