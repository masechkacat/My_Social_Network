import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAsyncOperation = ({ type, operation }) =>
  createAsyncThunk(type, async (args, { rejectWithValue }) => {
    try {
      const response = await operation(args);
      // Извлекаем только те данные, которые нужны, например, токен и информацию о пользователе
      const { jwt, user } = response.data;
      // Если в ответе нет user, считаем, что все данные ответа - это данные пользователя
      // Если jwt не возвращается, то мы устанавливаем его в null
      return { jwt: jwt || null, user: user || response.data };
    } catch (error) {
      // Также убедитесь, что здесь возвращаются только сериализуемые данные об ошибке
      return rejectWithValue(error.response.data);
    }
  });