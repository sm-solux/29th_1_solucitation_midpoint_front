import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ name: '본인', profileImage: '/img/default-profile.png', address: '' });
  const [friends, setFriends] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState('');

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo, friends, setFriends, selectedPurpose, setSelectedPurpose }}>
      {children}
    </AppContext.Provider>
  );
};
