import { useSelector } from 'react-redux';
import PostsScreen from './PostsScreen';
import Jumbotron from '../components/jumbotron/jumbotron';

function HomeScreen() {
  // Получаем состояние аутентификации из Redux store
  const token = useSelector((state) => !!state.user.token);

  return (
    <>
      <Jumbotron />
      {token &&  <PostsScreen />}
    </>
  );
}

export default HomeScreen;
