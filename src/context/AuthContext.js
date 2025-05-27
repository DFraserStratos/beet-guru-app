import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks';

const AuthContext = createContext({
  user: null,
  selectedPersona: null,
  login: () => {},
  logout: () => {},
  selectPersona: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('beet-guru-user', null);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const login = (userData) => {
    const userToSet = selectedPersona || userData;
    setUser(userToSet);
    setSelectedPersona(null);
  };

  const logout = () => {
    setUser(null);
    setSelectedPersona(null);
  };

  const selectPersona = (persona) => {
    setSelectedPersona(persona);
  };

  return (
    <AuthContext.Provider value={{ user, selectedPersona, login, logout, selectPersona }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
