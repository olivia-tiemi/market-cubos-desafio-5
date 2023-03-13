import ProductForm from '../../components/ProductForm';
import productSchema from '../../validations/productSchema';
import { useSchemaStore, useTypeStore } from '../../hooks/useStore';

const EditProduct = () => {
  const updateSchema = useSchemaStore((state) => state.updateSchema);
  const updateType = useTypeStore((state) => state.updateType);
  updateSchema(productSchema);
  updateType('edit');
  return <ProductForm type="edit" />;
};

export default EditProduct;
