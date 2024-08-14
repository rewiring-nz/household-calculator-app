import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

// const App = () => {
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Home/>
    </ThemeProvider>
  );
}

export default App;
