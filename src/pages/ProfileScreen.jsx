import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, updateUser } from '../store/user/actions'; // Убедитесь в правильности пути

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const { data: userData, isLoading, error } = useSelector((state) => state.user);
//   console.log('Состояние пользователя: ', userData, isLoading, error);

//   useEffect(() => {
//     dispatch(fetchCurrentUser()).then((response) => {
//       console.log('Ответ от fetchCurrentUser: ', response); // Добавьте для отладки
//     });
//   }, [dispatch]);

//   if (isLoading) return <p>Загрузка...</p>;
//   if (error) return <p>Ошибка: {error}</p>;

//   // Обратите внимание, что мы используем userData.user, а не просто userData
//   return (
//     <div>
//       <h1>Профиль пользователя</h1>
//       <p>Имя: {userData?.user?.username}</p>
//       <p>Email: {userData?.user?.email}</p>
//       {/* Отображение другой информации о пользователе */}
//     </div>
//   );
// };

// export default ProfileScreen;

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data); // Данные пользователя из состояния
  const [isEditing, setIsEditing] = useState(false); // Состояние для переключения режима
  const [formData, setFormData] = useState({ username: '', description: '' });
  const userId = userData?.user?.id; // ID пользователя

  useEffect(() => {
    dispatch(fetchCurrentUser()); // Получаем данные пользователя при монтировании
  }, [dispatch]);

  useEffect(() => {
    if (userData?.user) {
      setFormData({ username: userData.user.username, description: userData.user.description || '' }); // Инициализация формы данными пользователя
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId, userData: formData })); // Экшен для обновления профиля
    setIsEditing(false); // Выход из режима редактирования
  };

  const editMode = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Сохранить изменения</button>
      <button onClick={() => setIsEditing(false)}>Отмена</button>
    </form>
  );

  const viewMode = (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя: {userData?.user?.username}</p>
      <p>Описание: {userData?.user?.description}</p>
      <button onClick={() => setIsEditing(true)}>Редактировать</button>
    </div>
  );

  return (
    <div>
      {isEditing ? editMode : viewMode}
    </div>
  );
}

export default Profile;
