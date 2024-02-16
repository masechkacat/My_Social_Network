// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../logoutButton/logoutButton'; // Убедись, что путь к компоненту LogoutButton верный

const Navbar = () => {
  const token = useSelector((state) => state.user.token);
  console.log('token from navbar', token);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/offers">Offers</Link>
      {token ? (
        <>
          <Link to="/profile">Profile</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
