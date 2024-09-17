import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DrawerContextProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

interface DrawerProviderProps {
    children: ReactNode;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    const savedDrawerOpen = JSON.parse(sessionStorage.getItem('drawerOpen') || 'false');
    const savedScrollPosition = JSON.parse(sessionStorage.getItem('scrollPosition') || '0');

    setDrawerOpen(savedDrawerOpen);
    setScrollPosition(savedScrollPosition);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('drawerOpen', JSON.stringify(drawerOpen));
    sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
  }, [drawerOpen, scrollPosition]);

  return (
    <DrawerContext.Provider value={{ drawerOpen, toggleDrawer, scrollPosition, setScrollPosition }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = (): DrawerContextProps => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};