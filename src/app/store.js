import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../store/user/reducer';
import { postReducer } from '../store/post/reducer';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});