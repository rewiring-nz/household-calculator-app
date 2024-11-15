import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/methodology" element={<Methodology />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
