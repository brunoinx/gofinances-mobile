import { createContext, useEffect, useState } from 'react';

import { UserDTO } from '@/dtos/UserDTO';

import { getUserStorage, setUserStorage } from '@/storage/user';

interface ProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  userData: UserDTO;
  handleUpdateUserData: (user: UserDTO) => void;
  handleSocialAuthentication: (user: UserDTO) => void;
  signOut: () => void;
  isUserAuthenticated: boolean;
}

export const AuthContextData = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ProviderProps) {
  const [userData, setUserData] = useState({} as UserDTO);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      const user = await getUserStorage();

      if (user) {
        setUserData(user);
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    }
    loadUserData();
  }, [userData]);

  async function handleSocialAuthentication(user: UserDTO) {
    try {
      await setUserStorage(user);
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    await setUserStorage({} as UserDTO);
    setUserData({} as UserDTO);
    setIsUserAuthenticated(false);
  }

  function handleUpdateUserData(userData: UserDTO) {
    setUserData(userData);
  }

  return (
    <AuthContextData.Provider
      value={{
        userData,
        handleSocialAuthentication,
        handleUpdateUserData,
        signOut,
        isUserAuthenticated,
      }}>
      {children}
    </AuthContextData.Provider>
  );
}
