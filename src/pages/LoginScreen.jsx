import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/user/actions'; // Убедитесь, что путь корректен
import { AppRoute } from '../const';

function LoginScreen() {
  const [formData, setFormData] = useState({
    identifier: '',
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
    dispatch(loginUser(formData)).then(({ payload }) => {
      if (payload) {
        // Перенаправляем пользователя после успешной регистрации
        navigate(AppRoute.Profile);
      }
      // Если нужно обработать ошибки - они будут доступны через состояние error
    });
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
      {isLoading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}
        <div>
          <label>Email:</label>
          <input name="identifier" value={formData.identifier} onChange={handleChange} />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginScreen;
