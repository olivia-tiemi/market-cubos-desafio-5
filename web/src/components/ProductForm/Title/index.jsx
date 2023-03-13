import { useProductStore, useTypeStore } from '../../../hooks/useStore';
import Input from '../../Input';

const Title = ({ errors }) => {
  const storedProduct = useProductStore((state) => state.product);
  const type = useTypeStore((state) => state.type);
  return (
    <div className="input-error">
      <Input
        element="input"
        variableName="title"
        label="Título"
        type="text"
        placeholder="Nome do produto"
        defaultValue={type == 'edit' ? storedProduct.title : ''}
        width="62.34vw"
        count="200"
      />
      <p style={{ color: 'red' }}>{errors.title?.message}</p>
    </div>
  );
};

export default Title;
