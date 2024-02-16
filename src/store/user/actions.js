// features/user/userActions.js
import { createAPI } from '../../service/api';
import { createAsyncOperation } from '../utils';

export const registerUser = createAsyncOperation({
  type: 'user/register',
  operation: async (userData) => {
    const api = createAPI();
    return api.post('/auth/local/register', userData);
  },
});

export const loginUser = createAsyncOperation({
  type: 'user/login',
  operation: async (loginData) => {
    const api = createAPI();
    return api.post('/auth/local', loginData);
  },
});

export const fetchCurrentUser = createAsyncOperation({
  type: 'user/fetchCurrent',
  operation: async () => {
    const api = createAPI();
    return api.get('/users/me');
  },
});

export const updateUser = createAsyncOperation({
  type: 'user/update',
  operation: async ({ userId, userData }) => {
    const api = createAPI();
    // Используйте userId для формирования URL
    return api.put(`/users/${userId}`, userData);
  },
});

