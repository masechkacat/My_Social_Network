import { dropToken } from "../../service/token";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useDispatch } from 'react-redux';
import { resetState } from '../../store/user/reducer';
import { MdLogout } from "react-icons/md";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dropToken(); // Удаление токена
    dispatch(resetState()); // Сброс состояния
    navigate(AppRoute.Login); // Перенаправление на страницу входа
  };

  return (
    <button onClick={handleLogout} className="inline-flex flex-col items-center justify-center px-5 hover:bg-slate-50 dark:hover:bg-slate-800 group">
      <MdLogout className="w-5 h-5 mb-2 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" onClick={handleLogout}>LogOut</MdLogout>
      <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">LogOut</span>
    </button>
  );
}

export default LogoutButton;
