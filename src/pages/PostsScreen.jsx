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
  // {data: Array(7), meta: {…}}
  // data  :   Array(7)
  // 0  :   attributes  :   {text: 'опадолопаоп', like: 0, modified: false, createdAt: '2024-02-16T23:39:50.867Z', updatedAt: '2024-02-16T23:39:50.867Z', …}
  // id  :   2

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
            <li key={post.id}>
              <h3>{post.attributes?.text}</h3>
              <p>{post.attributes?.user}</p>
              {/* Другие элементы поста, если необходимо */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostsScreen;
