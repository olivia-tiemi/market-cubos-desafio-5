import { toast } from 'react-toastify';

export const errorToast = (error) => {
  toast.error(error.response.data.message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const successToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
