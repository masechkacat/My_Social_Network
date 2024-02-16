import { dropToken } from "../../service/token";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/user/reducer';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dropToken(); // Удаление токена
    dispatch(resetState()); // Сброс состояния
    navigate(AppRoute.Login); // Перенаправление на страницу входа
  };

  return (
    <button onClick={handleLogout}>LogOut</button>
  );
}

export default LogoutButton;
