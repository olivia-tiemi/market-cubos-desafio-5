import { useProductStore, useTypeStore } from '../../../hooks/useStore';
import InputFile from '../../InputFile';

const Photo = ({ errors }) => {
  const storedProduct = useProductStore((state) => state.product);
  const type = useTypeStore((state) => state.type);
  return (
    <div className="input-error">
      <InputFile
        defaultValue={
          type == 'edit' && [storedProduct.photoUrl, storedProduct.photoPath]
        }
      />
      <p style={{ color: 'red' }}>{errors.photo?.message}</p>
    </div>
  );
};

export default Photo;
