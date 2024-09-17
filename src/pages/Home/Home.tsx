import React, { useEffect, useState } from 'react';
import logo from '../../assets/logos/RewiringAotearoa_logo.svg';
import { useTheme } from '@mui/material/styles';
import HouseholdForm from '../../components/HouseholdForm/HouseholdForm';
import HouseholdSavings from '../../components/HouseholdSavings/HouseholdSavings';
import { Box,Typography, useMediaQuery } from '@mui/material';
import useHouseholdData from 'src/hooks/useHouseholdData/useHouseholdData';
import { cooktopMapping, spaceHeatingMapping, waterHeatingMapping } from 'src/components/HouseholdForm/data/householdForm.text';
import MobileSavingsDrawer from 'src/components/MobileSavingsDrawer/MobileSavingsDrawer';
import { useDrawer } from 'src/components/MobileSavingsDrawer/DrawerContext';




const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const isMobile = true; // for debugging
  console.log('Home isMobile:', isMobile);

  const { householdData, updateHouseholdData, savingsData, loadingData, errorData } = useHouseholdData();


  const appliances = {
    currentSpaceHeater: householdData?.spaceHeating ? spaceHeatingMapping[householdData?.spaceHeating] : '',
    currentWaterHeater: householdData?.waterHeating ? waterHeatingMapping[householdData?.waterHeating] : '',
    currentCooktop: householdData?.cooktop ? cooktopMapping[householdData?.cooktop] : '',
  };

  // -----------------------------------------------------------
  // Drawer
  const { drawerOpen, toggleDrawer, scrollPosition, setScrollPosition } = useDrawer();

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setScrollPosition]);
  // -----------------------------------------------------------


  return (
    <Box className="Home"
      sx={{
        maxWidth: '90rem', // '1440px',
        margin: 'auto'
      }}>

      <Box className="Home-content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
          }
        }}
      >

        {/* ----------------------------------------------------------- */}
        {/* Home Form */}
        <Box className="Home-form"
          sx={{
            flex: 1,
            padding: '1rem',
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.up('md')]: {
              padding: '2rem 1.6rem 1.5rem 2rem',
            },
            [theme.breakpoints.up('lg')]: {
              padding: '2rem 2rem 2rem 3rem',
              width: '60vw',
            }
          }}
        >
          <img src={logo} className="Home-logo" alt="logo"
            style={{
              marginBottom: '1.2rem'
            }}
          />

          <Typography variant="h1"
            sx={{
              marginTop: '0.8rem',
              [theme.breakpoints.up('md')]: {
                marginTop: '1.8rem',
              },
              [theme.breakpoints.up('lg')]: {
                marginTop: '3.6rem',
              }
            }}
          >
            How much could you save by going electric?</Typography>
          <Typography variant="subtitle1">Enter your household information to find out</Typography>


          {householdData && <HouseholdForm householdData={householdData} updateHouseholdData={updateHouseholdData} />}
        </Box>
        {/* ----------------------------------------------------------- */}











        {/* -------------------------------------------------- */}
        {/* Home Savings Desktop */}

        {!isMobile && (
          <Box className="Home-savings"
          sx={{
            backgroundColor: theme.palette.background.default,
            padding: '0',
            [theme.breakpoints.up('sm')]: {
              padding: '1rem',
            },
            [theme.breakpoints.up('md')]: {
              padding: '2rem 2rem 1rem 1rem',
              '@media (min-aspect-ratio: 1/1)': {
                width: 'min(480px, 33%)'
              },
              '@media (max-aspect-ratio: 1/1)': {
                width: 'min(480px, 38%)'
              }
            },
          }}
          >
          {/* HouseholdSavings Desktop */}
          <HouseholdSavings appliances={appliances} results={savingsData} loadingData={loadingData} />
        </Box>
        )}
        {/* -------------------------------------------------- */}



        {/* Home Savings Mobile */}
        {isMobile && (
          <MobileSavingsDrawer
            appliances={appliances}
            results={savingsData}
            loadingData={loadingData}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
        )}
        {/* ----------------------------------------------------------- */}
        
        



      </Box>
      {/* ----------------------------------------------------------- */}





      {/* ----------------------------------------------------------- */}
      {/* Home Footer */}
      <Box className="Home-footer"
        sx={{
          padding: '1rem 1rem 5rem 1rem',
          position: 'relative',
          display: 'flex',
          backgroundColor: theme.palette.background.default,
          textAlign: 'center',
          [theme.breakpoints.up('md')]: {
            padding: '1rem 2rem 1.5rem 2rem',
          }
        }}
      >
        <Typography variant="caption"
          sx={{
            lineHeight: '1.625rem',
          }}
        >
          © Copyright Rewiring Aotearoa 2024</Typography>


      </Box>

    </Box>
  );
};

export default Home;