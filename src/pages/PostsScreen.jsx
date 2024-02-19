import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/post/action'; // Импортируем экшен для получения постов

function PostsScreen() {
  const dispatch = useDispatch();
  
  // Используем useEffect для загрузки постов при монтировании компонента
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Используем useSelector для доступа к списку постов из состояния
  const posts = useSelector(state => state.post.data);
  const isLoading = useSelector(state => state.post.isLoading);
  const error = useSelector(state => state.post.error);
  console.log('posts:', posts);//ВОТ ЧТО ВЫВОДИТ ЛОГ
  
  // Если данные загружаются, показываем индикатор загрузки
  if (isLoading) return <div>Loading...</div>;

  // Если при загрузке произошла ошибка, показываем сообщение об ошибке
  if (error) return <div>Error: {error}</div>;

  // Отображаем список постов
  return (
    <div>
      <h2>Posts</h2>
      {posts.data && posts.data.length > 0 ? (
  <ul>
    {posts.data.map(post => (
      <li key={post.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="mb-6">
        <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">{post.attributes?.text}</p>
      </div>
      <figcaption className="flex items-center justify-between">
        <cite className="font-medium text-gray-500 dark:text-gray-400">Posted by {post.attributes?.user.data?.attributes?.username}</cite>
        {/* Место для дополнительных элементов, например даты или кнопок действий */}
      </figcaption>
    </li>
    
      // <li key={post.id}>
      //   <h3>{post.attributes?.text}</h3>
      //   {/* Убедитесь, что вы пытаетесь отобразить строку или число, а не объект */}
      //   <p>Username: {post.attributes?.user.data?.attributes?.username}</p>
      //   <p>Likes: {post.attributes?.like}</p>
      //   {/* Другие элементы поста, если необходимо */}
      // </li>
    ))}
  </ul>
) : (
  <p>No posts found.</p>
)}
    </div>
  );
}

export default PostsScreen;
