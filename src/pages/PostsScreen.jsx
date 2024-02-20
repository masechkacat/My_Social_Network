import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/post/action';
import PostCard from '../components/postCard/postCard';

function PostsScreen() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(state => state.post.data);
  const isLoading = useSelector(state => state.post.isLoading);
  const error = useSelector(state => state.post.error);
  console.log('posts:', posts);
  
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.data && posts.data.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.data.map(post => <PostCard key={post.id} post={post} />)}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
export default PostsScreen;
