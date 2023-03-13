import axios from './axios';

export const registerUser = (userData) => {
  return axios.post('/user', userData);
};

export const userLogin = (userData) => {
  return axios.post('/login', userData);
};

export const registerProduct = (product) => {
  return axios.post('/user/product', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = (productId, product) => {
  return axios.put(`/user/product/${productId}`, product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProduct = (productId) => {
  return axios.delete(`/user/product/${productId}`);
};

export const paginatedProducts = (page, perPage, debouncedFilter) => {
  return axios.get(`/product/${page}/${perPage}?filter=${debouncedFilter}`);
};

export const allProductsList = (debouncedFilter) => {
  return axios.get(`/user/product/all/all?filter=${debouncedFilter}`);
};
