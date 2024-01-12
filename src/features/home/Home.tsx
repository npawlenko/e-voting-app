import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import HomeLoggedIn from './HomeLoggedIn';
import HomeNotLoggedIn from './HomeNotLoggedIn';
import { Role } from 'features/auth/authSlice';
import AdminHome from './AdminHome';

const Home = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken !== null);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.role === Role.ADMIN)

  if (isLoggedIn) {
    return isAdmin ? <AdminHome /> : <HomeLoggedIn />;
  } else {
    return <HomeNotLoggedIn />;
  }
};

export default Home;