import axios from 'axios';

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      if (originalRequest.url !== '/login') {
        return Promise.reject(error);
      } else {
        setTimeout(() => {
          window.location.replace('http://localhost:5173/signin');
        }, 1000);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
