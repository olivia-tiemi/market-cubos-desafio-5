import useSWR from 'swr';
import axios from '../../../api/axios';
import {
  useProductStore,
  useRegisterStore,
  useTypeStore,
} from '../../../hooks/useStore';
import { CircularProgress } from '@mui/material';

const Categories = ({ errors }) => {
  const storedProduct = useProductStore((state) => state.product);
  const register = useRegisterStore((state) => state.register);
  const type = useTypeStore((state) => state.type);
  const { isLoading, data } = useSWR('/category', axios.get);
  let content;
  if (isLoading) content = <CircularProgress color="inherit" />;
  else {
    const options = data.data.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
    content = (
      <div className="category-container">
        <label htmlFor="category" className="form-label">
          Categoria
        </label>
        <select
          {...register('categoryId')}
          id="category"
          defaultValue={type == 'edit' ? storedProduct.categoryId : ''}
          className="categories"
        >
          <option value="">Selecione uma categoria</option>
          {options}
        </select>
      </div>
    );
  }
  return (
    <div className="input-error">
      {content}
      <p style={{ color: 'red' }}>{errors.categoryId?.message}</p>
    </div>
  );
};

export default Categories;
