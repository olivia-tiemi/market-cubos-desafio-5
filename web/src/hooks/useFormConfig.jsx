import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSchemaStore } from './useStore';

const useFormConfig = () => {
  const schema = useSchemaStore((state) => state.schema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors, setValue, reset, trigger };
};

export default useFormConfig;
