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
      <h2>Login</h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      {isLoading && <p>Загрузка...</p>}
      {error && <div className="error-message">{error}</div>}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required name="identifier" value={formData.identifier} onChange={handleChange} />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required name="password" value={formData.password} onChange={handleChange}/>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
    </div>
  );
}





export default LoginScreen;
