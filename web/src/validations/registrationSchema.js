import * as yup from 'yup';

const registrationSchema = yup.object().shape({
  storeName: yup.string().required('O campo nome da loja é obrigatório.'),
  email: yup
    .string()
    .email('Formato de e-mail inválido.')
    .required('O campo e-mail é obrigatório.'),
  password: yup
    .string()
    .min(5, 'A senha deve conter pelo menos 5 caracteres.')
    .required('O campo senha é obrigatório.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.')
    .required('O campo confirmação de senha é obrigatório.'),
});

export default registrationSchema;
