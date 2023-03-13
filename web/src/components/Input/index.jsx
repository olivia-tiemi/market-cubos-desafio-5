import { useState } from 'react';
import { useRegisterStore } from '../../hooks/useStore';
import './style.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Input = ({
  variableName,
  label,
  type,
  placeholder,
  defaultValue,
  width,
  count,
}) => {
  const register = useRegisterStore((state) => state.register);
  const [textLength, setTextLength] = useState(defaultValue.length);
  const [showPwd, setShowPwd] = useState(false);

  function handleCount(e) {
    setTextLength(e.target.value.length);
  }
  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };
  return (
    <div className="label-input">
      <label htmlFor={variableName} className="form-label">
        {label}
      </label>
      <div className="input-count">
        <input
          {...register(variableName)}
          type={type === 'password' && showPwd ? 'text' : type}
          id={variableName}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="form-input"
          style={{ width }}
          onInput={(e) => handleCount(e)}
          maxLength={count && count}
          step={variableName === 'price' ? '0.01' : ''}
        />
        {count && (
          <p className="count-word-input">
            {textLength} / {count}
          </p>
        )}
      </div>
      {variableName.toLowerCase().includes('password') && (
        <div onClick={handleShowPwd} className="password">
          {showPwd ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
        </div>
      )}
    </div>
  );
};

export default Input;
