import { useProductStore, useTypeStore } from '../../../hooks/useStore';
import Input from '../../Input';

const Price = ({ errors }) => {
  const storedProduct = useProductStore((state) => state.product);
  const type = useTypeStore((state) => state.type);
  return (
    <div className="input-error">
      <Input
        element="input"
        variableName="stock"
        label="Estoque"
        type="number"
        placeholder="Ex: 10"
        defaultValue={type == 'edit' ? storedProduct.stock : ''}
      />
      <p style={{ color: 'red' }}>{errors.stock?.message}</p>
    </div>
  );
};

export default Price;
