import * as yup from 'yup';

const productSchema = yup.object().shape({
  title: yup
    .string()
    .max(200, 'Ultrapassou o limite de caracteres.')
    .required('O campo título é obrigatório.'),
  description: yup
    .string()
    .max(2000, 'Ultrapassou o limite de caracteres.')
    .required('O campo descrição é obrigatório.'),
  price: yup
    .number()
    .typeError('Valor de preço inválido.')
    .positive('Valor de preço inválido.')
    .required('O campo preço é obrigatório.'),
  stock: yup
    .number()
    .typeError('Valor de estoque inválido.')
    .positive('Valor de estoque inválido.')
    .required('O campo estoque é obrigatório.'),
  categoryId: yup
    .number()
    .typeError('O campo categoria é obrigatório.')
    .positive()
    .required('O campo categoria é obrigatório.'),
  photo: yup
    .mixed()
    .test(
      'required',
      'É obrigatório carregar um arquivo com a foto do produto.',
      (value) => {
        if (!value) return false;
        return value.size <= 2000000;
      }
    ),
});

export default productSchema;
