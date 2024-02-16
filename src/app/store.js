import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/user/reducer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});