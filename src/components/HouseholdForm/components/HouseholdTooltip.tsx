/* eslint-disable react/prop-types */
import React from 'react';
import { styled, Theme, useTheme } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



const StyledTooltip = styled(Tooltip)(({ theme }: { theme: Theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 11,
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid',
        borderColor: theme.palette.divider,
        maxWidth: '20rem',
    },
}));

type HouseholdTooltipProps = TooltipProps & {
    title: string;
    children: React.ReactElement;
};

const HouseholdTooltip: React.FC<HouseholdTooltipProps> = ({ title, children, ...props }) => {
    const theme = useTheme();
    
    return (
        <StyledTooltip title={title} {...props} arrow theme={theme}>
            {children}
        </StyledTooltip>
    );
};


export default HouseholdTooltip;