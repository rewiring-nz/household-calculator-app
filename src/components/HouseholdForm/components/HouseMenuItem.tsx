import React from 'react';
import { MenuItem, ListItemIcon, Theme } from '@mui/material';
import { styled } from '@mui/system';
import TickIcon from 'src/assets/icons/tick.svg';

const StyledMenuItem = styled(MenuItem)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start', 
    minWidth: '3rem',
    '&.Mui-selected': {
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: theme.palette.primary.main, 
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }: { theme: Theme }) => ({
    // minWidth: '3rem',
    minWidth: 'unset !important',     
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    // '& .MuiListItemIcon-root': {
    //     minWidth: 'unset', 
    //   }
}));

interface HouseMenuItemProps {
    theme: Theme;
    value: any;
    selected: boolean;
    // open: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
}

const HouseMenuItem: React.FC<HouseMenuItemProps> = ({ theme, value, selected, onClick, children }) => {

    return (
        <StyledMenuItem 
            theme={theme} 
            value={value} 
            selected={selected}
            onClick={onClick}
            >
            {/* {selected && open && ( */}
            {selected && (
                <StyledListItemIcon theme={theme}>
                    <img src={TickIcon} alt="tick" />
                </StyledListItemIcon>
            )}
            {children}
        </StyledMenuItem>
    );
};

export default HouseMenuItem;