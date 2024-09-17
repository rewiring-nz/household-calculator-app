import React, { useState } from 'react';
import { IconButton, Typography, useTheme, SwipeableDrawer, Box, styled, Skeleton, CssBaseline } from '@mui/material';
import HouseholdSavings from './HouseholdSavings'; 
import { ReactComponent as ChevronDown} from 'src/assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp} from 'src/assets/icons/chevron-up.svg';
import { SavingsProps } from './HouseholdSavings/HouseholdSavings';


const drawerBleeding = 56; // 56px is the height of the toolbar


const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));



  
const MobileSavingsDrawer = (savings: SavingsProps) => {
    const { results, loadingData, appliances } = savings;
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={drawerOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    height: drawerOpen ? `calc(100% - ${drawerBleeding}px)` : `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                    transition: 'height 0.3s',
                },
            }}
            >
            <StyledBox theme={theme} onClick={toggleDrawer}
                sx={{
                    position: 'absolute',
                    top: -drawerBleeding,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                    display: 'flex',
                    height: drawerBleeding,
                    padding: '0 1.2rem',
                    justifyContent: 'space-between'
                }}
                >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                    <Typography 
                        sx={{
                            fontFamily: theme.typography.fontFamily,
                            fontSize: '1.25rem', // 20px
                            fontWeight: 600,
                        }}
                        >
                        Your Savings</Typography>
                    <Typography variant="body1">
                        (${(savings.results?.opex?.perWeek?.difference || 0)* -1} p/wk)
                    </Typography>
                </Box>

                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '0.25rem',
                    }}>
                {!drawerOpen && (
                <Typography variant="body1"
                    sx={{
                        textDecoration: 'underline',
                    }}
                    >
                    View
                </Typography>
                )}
                <IconButton onClick={toggleDrawer}>
                    {drawerOpen ? <ChevronUp /> : <ChevronDown />}
                </IconButton>
                </Box>
            </StyledBox>


            <StyledBox  theme={theme}
                sx={{ 
                    height: '100%', overflow: 'auto' 
                }}
                >
                <HouseholdSavings isMobile={true} appliances={appliances} results={results} loadingData={loadingData} />
            </StyledBox>

        </SwipeableDrawer>
    );
};

export default MobileSavingsDrawer;