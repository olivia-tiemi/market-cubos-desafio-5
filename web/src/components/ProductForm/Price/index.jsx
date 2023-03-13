import { useProductStore, useTypeStore } from '../../../hooks/useStore';
import Input from '../../Input';

const Price = ({ errors }) => {
  const storedProduct = useProductStore((state) => state.product);
  const type = useTypeStore((state) => state.type);
  return (
    <div className="input-error">
      <Input
        element="input"
        variableName="price"
        label="Preço"
        type="number"
        placeholder="R$"
        defaultValue={type == 'edit' ? storedProduct.price : ''}
      />
      <p style={{ color: 'red' }}>{errors.price?.message}</p>
    </div>
  );
};

export default Price;
