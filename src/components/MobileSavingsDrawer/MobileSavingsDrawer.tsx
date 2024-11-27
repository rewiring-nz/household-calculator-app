import React from 'react';
import { Typography, useTheme, SwipeableDrawer, Box, styled } from '@mui/material';
import HouseholdSavings from '../HouseholdSavings';
import { ReactComponent as ChevronDown } from 'src/assets/icons/chevron-down.svg';
import { ReactComponent as ChevronUp } from 'src/assets/icons/chevron-up.svg';
import { SavingsProps } from '../HouseholdSavings/HouseholdSavings';
import { formatSavingsNZD } from 'src/shared/utils/formatters';
import { useDrawer } from './DrawerContext';

export interface SavingsDrawerProps extends SavingsProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

const drawerToolbarHeight = 56;
const overlap = 4;


const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
}));




const MobileSavingsDrawer = (savings: SavingsDrawerProps) => {
    const { results, loadingData, appliances, numEVsToBuy } = savings;
    const { drawerOpen, toggleDrawer } = useDrawer();
    const theme = useTheme();


    return (
        <SwipeableDrawer
            anchor="bottom"
            open={drawerOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            swipeAreaWidth={drawerToolbarHeight}
            disableSwipeToOpen={false}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    overflow: 'visible',
                    transition: 'height 0.3s',
                    backgroundColor: theme.palette.primary.main,
                },
            }}
        >
            <StyledBox className="MobileSavingsDrawer-Toolbar"
                theme={theme}
                sx={{
                    position: 'fixed',
                    top: drawerOpen ? 0 : -drawerToolbarHeight,
                    bottom: drawerOpen ? 'auto' : 0,
                    right: 0,
                    left: 0,
                    visibility: 'visible',
                    display: 'flex',
                    height: drawerToolbarHeight + overlap,
                    padding: '0 1.2rem',
                    justifyContent: 'space-between',
                    zIndex: 1300,
                    boxShadow: drawerOpen ? 'none' : '0px -9px 17px rgba(0, 0, 0, 0.2)'
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
                        ({formatSavingsNZD(savings.results?.opex?.perWeek?.difference)} /wk)
                    </Typography>
                </Box>

                <Box
                    onClick={toggleDrawer}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        // pointerEvents: 'auto',
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


            <StyledBox theme={theme}
                sx={{
                    top: drawerToolbarHeight,
                    position: 'relative',
                    height: '100%',
                    overflow: 'auto'
                }}
            >
                <HouseholdSavings isMobile={true} appliances={appliances} results={results} numEVsToBuy={numEVsToBuy} loadingData={loadingData} />
            </StyledBox>

        </SwipeableDrawer>
    );
};

export default MobileSavingsDrawer;