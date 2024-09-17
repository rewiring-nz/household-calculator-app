import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import PasswordPrompt from './components/PasswordPrompt';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>      
      <PasswordPrompt>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </PasswordPrompt>
    </ThemeProvider>
  );
}

export default App;
