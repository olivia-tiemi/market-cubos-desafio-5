import {
  useProductStore,
  useRegisterStore,
  useTypeStore,
} from '../../../hooks/useStore';
import { useState } from 'react';

const Description = ({ errors }) => {
  const register = useRegisterStore((state) => state.register);
  const storedProduct = useProductStore((state) => state.product);
  const type = useTypeStore((state) => state.type);
  const [textLength, setTextLength] = useState(
    storedProduct.description?.length
  );

  function handleCount(e) {
    setTextLength(e.target.value.length);
  }
  return (
    <div className="input-error">
      <label htmlFor="description" className="form-label">
        Descrição do produto
      </label>
      <div className="textarea-count">
        <textarea
          {...register('description')}
          type="text"
          id="description"
          placeholder="Ex.: Camiseta branca, Tamanho G"
          defaultValue={type == 'edit' ? storedProduct.description : ''}
          onInput={(e) => handleCount(e)}
          maxLength={2000}
        />
        <p className="count-word-textarea">
          {textLength} / {2000}
        </p>
      </div>
      <p style={{ color: 'red' }}>{errors.description?.message}</p>
    </div>
  );
};

export default Description;
