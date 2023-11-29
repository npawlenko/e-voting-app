import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import HomeLoggedIn from './HomeLoggedIn';
import HomeNotLoggedIn from './HomeNotLoggedIn';

const Home = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken !== null);

  return isLoggedIn ? <HomeLoggedIn /> : <HomeNotLoggedIn />
};

export default Home;