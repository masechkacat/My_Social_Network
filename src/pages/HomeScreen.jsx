import { useSelector } from 'react-redux';
import PostForm from '../components/postForm/postForm';
import PostsScreen from './PostsScreen';
import Jumbotron from '../components/jumbotron/jumbotron';

function HomeScreen() {
  // Получаем состояние аутентификации из Redux store
  const token = useSelector((state) => state.user.token);

  return (
    <>
      {token ?
      (<>
      <PostForm />
      <PostsScreen />
      </>) : (
      <Jumbotron />
      )}
    </>
  );
}

export default HomeScreen;
