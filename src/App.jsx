import React from 'react';
import useIsMobile from './useIsMobile';
import LaptopApp from './laptop/LaptopApp';
import MobileApp from './mobile/MobileApp';

const App = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileApp /> : <LaptopApp />;
};

export default App;
