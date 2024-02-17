import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, fetchPosts } from './action';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.data = action.payload;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, handlePending)
      .addCase(fetchPosts.fulfilled, handleFulfilled)
      .addCase(fetchPosts.rejected, handleRejected)
      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, handleFulfilled)
      .addCase(createPost.rejected, handleRejected)
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, handleFulfilled)
      .addCase(deletePost.rejected, handleRejected);
  },
});

export const postReducer = postSlice.reducer;