import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/post/action'; // Убедитесь, что путь к экшенам корректен
import { fetchCurrentUser } from '../../store/user/actions'; // Убедитесь, что путь к экшенам корректен

function PostForm() {
  const [postContent, setPostContent] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data); // Получаем данные пользователя из состояния Redux

  useEffect(() => {
    if (!userData) {
      dispatch(fetchCurrentUser()); // Загружаем данные пользователя, если они ещё не загружены
    }
  }, [dispatch, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    console.log('userData:', userData);
    console.log('userData.id:', userData?.id);

    // Здесь мы убеждаемся, что у нас есть userData и userData.id перед отправкой
    if (userData && userData.id) {
      const postData = {
        text: postContent,
        user: userData.id // Передаем ID пользователя вместе с текстом поста
      };
      console.log('postData:', postData);
      dispatch(createPost(postData)); // Диспатчим экшен создания поста
      setPostContent(''); // Очистка поля ввода после отправки
    }
  };

  // Если userData или userData.id нет, то не отображаем форму создания поста
  if (!userData || typeof userData.id !== 'number') return null;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Что у вас нового?"
      />
      <button type="submit">Опубликовать</button>
    </form>
  );
}

export default PostForm;

