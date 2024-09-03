import React from 'react';
import logo from '../../assets/logos/RewiringAotearoa_logo.svg';
import { useTheme } from '@mui/material/styles';
import HouseholdForm from '../../components/HouseholdForm/HouseholdForm';
import HouseholdSavings from '../../components/HouseholdSavings/HouseholdSavings';
import { Box, Typography } from '@mui/material';
import useHouseholdData from 'src/hooks/useHouseholdData/useHouseholdData';




const Home: React.FC = () => {
  const theme = useTheme();
  // const { savingsData } = useHouseholdData();
  
  // React.useEffect(() => {
    //   console.log("Home useEffect savingsData:", savingsData);
    // }, [savingsData]);
    
    const { householdData, updateHouseholdData, savingsData, loadingData, errorData } = useHouseholdData();

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
            // overflowY: 'auto', // Enable independent scrolling
            padding: '1rem 1rem 20rem 1rem',
            width: '60vw'
          }
        }}
        >
        <img src={logo} className="Home-logo" alt="logo" />

        <Typography variant="h1">How much could you save by going electric?</Typography>
        <Typography variant="subtitle1">Enter your household information to find out</Typography>

        {/* <HouseholdForm/> */}
        {/* <HouseholdForm householdData={householdData} updateHouseholdData={updateHouseholdData} /> */}
        {householdData && <HouseholdForm householdData={householdData} updateHouseholdData={updateHouseholdData} />}
      </Box>    
      
      <Box className="Home-savings"
        sx={{
          flex: 1,
          padding: '1rem',
          backgroundColor: theme.palette.background.default,
          [theme.breakpoints.up('md')]: {
            // overflowY: 'auto', // Enable independent scrolling
            // maxWidth:  '38vw' // '33vw'
            '@media (min-aspect-ratio: 1/1)': {
              maxWidth: '33vw'
            },
            '@media (max-aspect-ratio: 1/1)': {
              maxWidth: '38vw'
            }
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: '30vw',
            display: 'flex',
            alignItems: 'center',
          }
        }}
      >
        {/* <HouseholdSavings /> */}
        <HouseholdSavings savingsData={savingsData} loadingData={loadingData} />
      </Box>
      
    </Box>
  );
};

export default Home;