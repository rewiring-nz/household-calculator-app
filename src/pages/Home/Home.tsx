import React from 'react';
import logo from '../../assets/logos/RewiringAotearoa_logo.svg';
import HouseholdForm from '../../components/HouseholdForm/HouseholdForm';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import HouseholdSavings from '../../components/HouseholdSavings/HouseholdSavings';
import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';

 


const Home: React.FC = () => {
  const theme = useTheme();
  // const { savingsData } = useHouseholdData();
  
  // React.useEffect(() => {
  //   console.log("Home useEffect savingsData:", savingsData);
  // }, [savingsData]);

  return (
    <Box className="Home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row'
        }
      }}
    >
    
      <Box className="Home-form"
        sx={{
          flex: 1,
          padding: '1rem',
          backgroundColor: theme.palette.background.default, 
          [theme.breakpoints.up('md')]: {
            overflowY: 'auto',
            width: '60vw'
          }      
        }}
        >
        <img src={logo} className="Home-logo" alt="logo" />

        <Typography variant="h1">How much could you save by going electric?</Typography>
        <Typography variant="subtitle1">Enter your household information to find out</Typography>

        <HouseholdForm/>
      </Box>    
      
      <Box className="Home-savings"
        sx={{
          flex: 1,
          padding: '1rem',
          backgroundColor: theme.palette.background.default,
          [theme.breakpoints.up('md')]: {
            overflowY: 'auto', // Enable independent scrolling
            maxWidth: '33vw'
          }
        }}
      >
        <HouseholdSavings />
      </Box>
      
    </Box>
  );
};

export default Home;