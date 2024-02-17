import { createAPI } from '../../service/api';
import { createAsyncOperation } from '../utils';

export const createPost = createAsyncOperation({
  type: 'post/create',
  operation: async (postData) => {
    const api = createAPI();
    // Убедитесь, что данные передаются в правильном формате, который ожидается вашим API
   
    console.log('postData from action:', postData);
    return api.post('/posts', { data: postData });
  },
});


export const fetchPosts = createAsyncOperation({
  type: 'post/fetch',
  operation: async () => {
    const api = createAPI();
    return api.get('/posts?populate=user');
  },
});

export const deletePost = createAsyncOperation({
  type: 'post/delete',
  operation: async (postId) => {
    const api = createAPI();
    return api.delete(`/posts/${postId}`);
  },
});
