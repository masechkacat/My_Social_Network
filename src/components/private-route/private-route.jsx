/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Cookies from 'js-cookie';

function isUserAuthenticated() {
  const token = Cookies.get('token');
  return !!token; // Преобразует наличие токена в булево значение
}


function PrivateRoute({ children }) {
  const isAuthenticated = isUserAuthenticated(); // Проверяем аутентификацию пользователя

  return isAuthenticated ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
