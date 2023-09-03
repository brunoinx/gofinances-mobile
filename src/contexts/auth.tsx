import { createContext, useCallback, useEffect, useState } from 'react';

import { UserDTO } from '@/dtos/UserDTO';

import { getUserStorage, setUserStorage } from '@/storage/user';

interface ProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  userData: UserDTO;
  isUserAuthenticated: boolean;
  handleUpdateUserData: (user: UserDTO) => void;
  handleSocialAuthentication: (user: UserDTO) => void;
  signOut: () => void;
}

export const AuthContextData = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ProviderProps) {
  const [userData, setUserData] = useState({} as UserDTO);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      const user = await getUserStorage();

      if (!user?.id) {
        setUserData({} as UserDTO);
        setIsUserAuthenticated(false);
      } else {
        setUserData(user);
        setIsUserAuthenticated(true);
      }
    }
    loadUserData();
  }, []);

  const handleSocialAuthentication = useCallback(async (user: UserDTO) => {
    try {
      await setUserStorage(user);
      setUserData(user);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async () => {
    await setUserStorage({} as UserDTO);
    setUserData({} as UserDTO);
    setIsUserAuthenticated(false);
  }, []);

  function handleUpdateUserData(userData: UserDTO) {
    setUserData(userData);
  }

  return (
    <AuthContextData.Provider
      value={{
        userData,
        isUserAuthenticated,
        handleSocialAuthentication,
        handleUpdateUserData,
        signOut,
      }}>
      {children}
    </AuthContextData.Provider>
  );
}
