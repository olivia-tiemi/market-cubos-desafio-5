import ProductForm from '../../components/ProductForm';
import productSchema from '../../validations/productSchema';
import { useSchemaStore, useTypeStore } from '../../hooks/useStore';

const AddProduct = () => {
  const updateSchema = useSchemaStore((state) => state.updateSchema);
  const updateType = useTypeStore((state) => state.updateType);
  updateSchema(productSchema);
  updateType('add');
  return <ProductForm type="add" />;
};

export default AddProduct;
