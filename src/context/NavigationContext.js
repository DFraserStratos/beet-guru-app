import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('home');

  const navigate = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <NavigationContext.Provider value={{ activeScreen, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
