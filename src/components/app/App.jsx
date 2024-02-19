//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { AppRoute} from '../../const';
import HomeScreen from '../../pages/HomeScreen';
import LoginScreen from '../../pages/LoginScreen';
import RegisterScreen from '../../pages/RegisterScreen';
import PostsScreen from '../../pages/PostsScreen';
import NotFoundScreen from '../../pages/NotFoundScreen';
import ProfileScreen from '../../pages/ProfileScreen';
import Navbar from '../navbar/navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="lg:pt-16">
      <Routes>
        <Route path={AppRoute.Home} element={<HomeScreen />} />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={AppRoute.Register} element={<RegisterScreen />} />
        <Route path={AppRoute.Profile} element={<PrivateRoute ><ProfileScreen /></PrivateRoute>} />
        <Route path={AppRoute.Posts} element={<PrivateRoute ><PostsScreen /></PrivateRoute>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
