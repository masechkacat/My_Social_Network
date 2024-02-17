import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, updateUser } from '../store/user/actions'; // Убедитесь в правильности пути

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data); // Данные пользователя из состояния
  const [isEditing, setIsEditing] = useState(false); // Состояние для переключения режима
  const [formData, setFormData] = useState({ username: '', description: '' });
  const userId = userData?.id; // ID пользователя

  useEffect(() => {
    dispatch(fetchCurrentUser()).then((response) => {
      console.log('Ответ от fetchCurrentUser: ', response.payload); // Добавьте для отладки
      if (response.payload) {
        setFormData({ username: response.payload.username, description: response.payload.description || '' }); // Инициализация формы данными пользователя
      }
    });
  }, [dispatch]);

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
      <p>Имя: {userData?.username}</p>
      <p>Описание: {userData?.description}</p>
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
