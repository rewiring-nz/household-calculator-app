import React from 'react';
import { Typography, useTheme, SwipeableDrawer, Box, styled } from '@mui/material';
import HouseholdSavings from '../HouseholdSavings'; 
import { ReactComponent as ChevronDown} from 'src/assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp} from 'src/assets/icons/chevron-up.svg';
import { SavingsProps } from '../HouseholdSavings/HouseholdSavings';
import { formatNZD } from 'src/shared/utils/formatters';
import { useDrawer } from './DrawerContext';

export interface SavingsDrawerProps extends SavingsProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

const drawerBleeding = 56; // 56px is the height of the toolbar


const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));



  
const MobileSavingsDrawer = (savings: SavingsDrawerProps) => {
    const { results, loadingData, appliances } = savings;
    const { drawerOpen, toggleDrawer } = useDrawer();
    const theme = useTheme();

    // Moved to Home.tsx
    // const [drawerOpen, setDrawerOpen] = useState(false);
    // const toggleDrawer = () => { 
    //     // setDrawerOpen(!drawerOpen);
    //     setDrawerOpen((prev) => !prev);
    // };

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
                    visibility: 'visible',
                    transition: 'height 0.3s',
                    // pointerEvents: 'auto',
                },
                // '& .MuiPaper-root': {
                //     pointerEvents: 'auto',
                //     visibility: 'visible',
                // },
            }}
            >
            {/* <StyledBox theme={theme} onClick={toggleDrawer} */}
            <StyledBox className="MobileSavingsDrawer-Toolbar"
                theme={theme} 
                sx={{
                    position: 'fixed',
                    top: drawerOpen ? 0 : -drawerBleeding,
                    bottom: drawerOpen ? 'auto' : 0,
                    right: 0,
                    left: 0,
                    visibility: 'visible',
                    display: 'flex',
                    height: drawerBleeding,
                    padding: '0 1.2rem',
                    justifyContent: 'space-between',
                    zIndex: 1300,
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
                        ({formatNZD(savings.results?.opex?.perWeek?.difference)} /wk)
                    </Typography>
                </Box>

                <Box 
                    onClick={toggleDrawer}
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                    }}>
                {drawerOpen ? (
                    <ChevronUp />
                ) : (
                    <>
                        <Typography
                            variant="body1"
                            sx={{
                                textDecoration: 'underline',
                            }}
                        >
                            View
                        </Typography>
                        <ChevronDown />
                    </>
                )}
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