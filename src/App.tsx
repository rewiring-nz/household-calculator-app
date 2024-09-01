import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import PasswordPrompt from './components/PasswordPrompt';

const App: React.FC = () => {
  const isDevelopment = process.env.HOUSEHOLD_CALCULATOR_APP === 'dev'; 
  return (
    <ThemeProvider theme={theme}>
      {/* {isDevelopment ? ( */}
      <PasswordPrompt>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>
    </PasswordPrompt>
    {/*  ) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/methodology" element={<Methodology />} />
      </Routes>
    )} */}
    </ThemeProvider>
  );
}

export default App;
