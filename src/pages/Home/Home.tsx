import React from 'react';
import logo from '../../assets/logos/RewiringAotearoa_logo.svg';
import HouseholdForm from '../../components/HouseholdForm/HouseholdForm';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

// const style = {




const Home: React.FC = () => {
  const theme = useTheme();
  
  return (
    // <div className="Home">
    <Box sx={{
      padding: '1rem',
      backgroundColor: theme.palette.background.default, // Using primary color from the theme
      // color: theme.palette.secondary.main, // Using secondary color from the theme
    }}>
    {/* <AppBar position="static"
      sx={{width: '100%'}}> */}
      {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <img src={logo} className="Home-logo" alt="logo" />
      </Typography> */}
    {/* </AppBar> */}
        <img src={logo} className="Home-logo" alt="logo" />

      {/* <h1>How much could you save by going electric?</h1> */}
      <Typography variant="h1">How much could you save by going electric?</Typography>
      <Typography variant="subtitle1">Enter your household information to find out</Typography>

      <HouseholdForm/>
      </Box>
    // {/* </div> */}
  );
};

export default Home;