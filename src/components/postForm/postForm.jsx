import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/post/action'; // Убедитесь, что путь к экшенам корректен
import { fetchCurrentUser } from '../../store/user/actions'; // Убедитесь, что путь к экшенам корректен
import { fetchPosts } from '../../store/post/action'; // Убедитесь, что путь к экшенам корректен

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
      dispatch(createPost(postData)).then(() => {
        dispatch(fetchPosts()); // Повторный запрос списка постов
      });
      setPostContent('');
      }
  };

  // Если userData или userData.id нет, то не отображаем форму создания поста
  if (!userData || typeof userData.id !== 'number') return null;

  return (
<form className="max-w-sm mx-auto pb-5" onSubmit={handleSubmit} >
  <div className="mb-5">
    <label  htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
    <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a news..."></textarea>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
    
  );
}


{/* <form className="max-w-sm mx-auto" onSubmit={handleSubmit} >
  <div className="mb-5">
    <label  htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
    <textarea onChange={(e) => setPostContent(e.target.value)} value={postContent} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form> */}

export default PostForm;

