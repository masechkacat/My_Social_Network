import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAsyncOperation = ({ type, operation }) =>
  createAsyncThunk(type, async (args, { rejectWithValue }) => {
    try {
      const response = await operation(args);
      const { jwt, user } = response.data;
      // Если jwt не возвращается, то возвращаем только response.data
      if (!jwt) {
        return response.data;
      }
      // Если в ответе нет user, считаем, что все данные ответа - это данные пользователя
      return { jwt: jwt || null, user: user || response.data };
    } catch (error) {
      // Также убедитесь, что здесь возвращаются только сериализуемые данные об ошибке
      return rejectWithValue(error.response.data);
    }
  });