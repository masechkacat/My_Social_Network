/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, updateUser } from '../store/user/actions'; // Убедитесь в правильности пути
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../store/user/actions';
import { GiPlagueDoctorProfile } from 'react-icons/gi';

function ProfileScreen() {
  const { userId: profileUserId } = useParams(); // ID из URL
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data);
  const viewedProfileData = useSelector(state => state.user.viewedProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', description: '' });
// Определяем, находимся ли мы на странице собственного профиля
const isOwnProfile = !profileUserId || profileUserId === userData?.id.toString();

// Выбираем данные для отображения на странице профиля
const profileData = isOwnProfile ? userData : viewedProfileData;
console.log('viewedProfileData:', viewedProfileData);//viewedProfileData: null

console.log('userData:', userData);
  
//сразу после логина в userData приходит вот такой объект
//jwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4NDU4NzY5LCJleHAiOjE3MTEwNTA3Njl9.gHrpLQLfovKIZjOy36RhUBwuEwrr058nWQ-BWkKrn9k"
//user:{id: 1, username: 'Marina', email: 'masechkacat@gmail.com', provider: 'local', confirmed: true, …}

//после перезагрузки страницы вот такой userData: {id: 1, username: 'Marina', email: 'masechkacat@gmail.com', provider: 'local', confirmed: true,…}

useEffect(() => {
    // Проверяем, необходимо ли загружать или обновлять данные
    const shouldFetchUser = isOwnProfile ? !userData : profileUserId !== userData?.id.toString();
  
    if (shouldFetchUser) {
      if (isOwnProfile) {
        dispatch(fetchCurrentUser());
      } else {
        dispatch(fetchUserById(profileUserId));
      }
    }
  }, [dispatch, profileUserId, userData?.id, isOwnProfile]);
  
  
  useEffect(() => {    
    // Инициализация формы данными пользователя при редактировании собственного профиля
    if (isOwnProfile) {
      setFormData({ username: userData?.username || '', description: userData?.description || '' });
    }
  }, [userData, isOwnProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOwnProfile) {
      // Обновляем данные только если это собственный профиль
      dispatch(updateUser({ userId: userData?.id, userData: formData }));
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-10">
      <div className={`bg-slate-400 border border-gray-600 rounded-lg shadow p-5 ${isEditing ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center py-5">
          <GiPlagueDoctorProfile className="w-24 h-24 mb-3" alt="Profile icon" />
          <h5 className="mb-1 text-xl font-medium">{profileData?.username}</h5>
          <span className="text-sm">{profileData?.description}</span>
          {isOwnProfile && 
          <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Profile</button>
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className={`${isEditing ? 'block' : 'hidden'}`}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );

}

export default ProfileScreen;

