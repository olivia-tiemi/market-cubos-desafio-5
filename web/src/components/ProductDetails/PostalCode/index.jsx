import { Typography } from '@mui/material';
import InputMask from 'react-input-mask';

const PostalCode = () => {
  return (
    <>
      <Typography variant="bodySemiBold">Calcular frete e prazo</Typography>
      <InputMask
        mask="99999-999"
        placeholder="Digite o CEP"
        className="input-cep"
      />
    </>
  );
};

export default PostalCode;
