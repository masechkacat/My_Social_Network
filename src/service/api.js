import axios from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {getToken, saveToken } from './token';

const StatusCodeMapping = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'http://localhost:1337/api';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    // Пути, не требующие аутентификации
    const publicPaths = ['/auth/local/register', '/auth/local', '/posts'];
    const isPublicPath = publicPaths.some(path => config.url.includes(path));
  
    if (!isPublicPath) {
      const token = getToken();
      if (token) {
        console.log('token', token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    config.headers['Content-Type'] = 'application/json';
    return config;
  });
  
  api.interceptors.response.use(
    (response) => {
      // Проверяем, является ли запрос операцией аутентификации
      if (response.data.jwt) {
        saveToken(response.data.jwt); // Сохраняем токен при успешном логине/регистрации
      }
      return response;
    },    (error) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};