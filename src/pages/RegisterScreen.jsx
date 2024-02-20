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
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  {isLoading && <p>Загрузка...</p>}
  {error && <div className="error-message">{error}</div>}
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your username</label>
    <input type="text" id="username" className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your pseudo" required name="username" value={formData.username} onChange={handleChange} />
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required value={formData.email} onChange={handleChange} name='email' />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required value={formData.password} onChange={handleChange} name='password' />
  </div>
  {/* <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Repeat password</label>
    <input type="password" id="repeat-password" className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div> */}
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-blue-300 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:focus:ring-offset-slate-800" required />
    </div>
    <label htmlFor="terms" className="ms-2 text-sm font-medium text-slate-900 dark:text-slate-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>
  );
}





export default RegisterScreen;
