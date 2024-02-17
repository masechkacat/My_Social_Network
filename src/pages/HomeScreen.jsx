import { useSelector } from 'react-redux';
import PostForm from '../components/postForm/postForm';
import PostsScreen from './PostsScreen';

function HomeScreen() {
  // Получаем состояние аутентификации из Redux store
  const isAuthenticated = useSelector(state => !!state.user.token); // Пример, адаптируйте под ваш стейт

  return (
    <div>
      <h1>Главная страница</h1>
      {isAuthenticated && <PostForm />}
      <PostsScreen />
    </div>
  );
}

export default HomeScreen;
