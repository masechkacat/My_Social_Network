import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchCurrentUser, updateUser } from './actions';
import { getToken } from '../../service/token';

// Вспомогательные функции для обработки состояний
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  console.log('Данные пользователя получены: ', action.payload);
  state.isLoading = false;
  state.data = action.payload;
  state.token = action.payload.jwt || state.token; // Обновляем токен, если он есть в ответе
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    error: null,
    data: null,
    token: getToken() || null,
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.data = null;
      state.token = null;
    },
  },
    extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, handleFulfilled)
      .addCase(fetchCurrentUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleRejected);
      // Можно добавить другие экшены, используя те же обработчики
  },
});

export const userReducer = userSlice.reducer;
export const { resetState } = userSlice.actions;
