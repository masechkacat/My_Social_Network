import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchCurrentUser, updateUser, fetchUserById } from './actions';
import { getToken } from '../../service/token';

// Вспомогательные функции для обработки состояний
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  console.log('Данные пользователя получены: ', action.payload);
  state.isLoading = false;
  state.data = action.payload.user;
  state.token = action.payload.jwt || state.token; // Обновляем токен, если он есть в ответе
};

const handleCurrentUserFulfilled = (state, action) => {
  console.log('Данные текущего пользователя получены: ', action.payload);
  state.isLoading = false;
  state.data = action.payload;
  state.token = action.payload.jwt || state.token; // Обновляем токен, если он есть в ответе
};

const handleViewedUserFulfilled = (state, action) => {
  console.log('Данные просматриваемого пользователя получены: ', action.payload);
  state.isLoading = false;
  state.viewedProfile = action.payload;
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
    viewedProfile: null,
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
      .addCase(fetchCurrentUser.fulfilled, handleCurrentUserFulfilled)
      .addCase(fetchCurrentUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, handleViewedUserFulfilled)
      .addCase(fetchUserById.rejected, handleRejected);
      // Можно добавить другие экшены, используя те же обработчики
  },
});

export const userReducer = userSlice.reducer;
export const { resetState } = userSlice.actions;
