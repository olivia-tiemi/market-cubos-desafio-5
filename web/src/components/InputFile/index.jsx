import { useState, useRef, useEffect } from 'react';
import noImage from '../../assets/no-image.svg';
import {
  useRegisterStore,
  useSetValueStore,
  useTriggerStore,
} from '../../hooks/useStore';

const InputFile = ({ defaultValue }) => {
  const register = useRegisterStore((state) => state.register);
  const setValue = useSetValueStore((state) => state.setValue);
  const trigger = useTriggerStore((state) => state.trigger);
  const [image, setImage] = useState(defaultValue ? defaultValue[0] : noImage);
  const [imageName, setImageName] = useState(defaultValue[1]);
  const fileInputRef = useRef(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setImage(reader.result);
    });
    setImageName(file?.name);
    setValue('photo', file);
    trigger('photo');
    reader.readAsDataURL(file);
  }

  function handleImageClick() {
    fileInputRef.current.click();
  }

  return (
    <div className="label-input">
      <label htmlFor="photo" className="form-label">
        Adicionar foto
      </label>
      <input
        {...register('photo')}
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <img
        src={image}
        alt="Imagem selecionada"
        onClick={handleImageClick}
        style={{ maxWidth: '160px' }}
      />
      {imageName && <p>{imageName}</p>}
    </div>
  );
};

export default InputFile;
