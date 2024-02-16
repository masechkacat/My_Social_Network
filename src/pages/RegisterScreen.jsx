import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/user/actions'; // Убедитесь, что путь корректен
import { AppRoute } from '../const';

function RegisterScreen() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем состояние из store
  const { isLoading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then(({ payload }) => {
      if (payload) {
        // Перенаправляем пользователя после успешной регистрации
        navigate(AppRoute.Profile);
      }
      // Если нужно обработать ошибки - они будут доступны через состояние error
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterScreen;
