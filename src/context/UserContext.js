import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('beet-guru-user', null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
