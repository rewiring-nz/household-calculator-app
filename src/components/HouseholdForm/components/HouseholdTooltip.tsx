/* eslint-disable react/prop-types */
import React from 'react';
import { styled, Theme, useTheme } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



// const StyledTooltip = styled(Tooltip)(({ theme }: { theme: Theme }) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//         boxShadow: theme.shadows[1],
//         fontSize: 11,
//         padding: '0.5rem',
//         borderRadius: '4px',
//         border: '1px solid',
//         borderColor: theme.palette.divider,
//         maxWidth: '20rem',
//     },
// }));

const StyledTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: Theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        // color: theme.palette.common.white,
        // boxShadow: theme.shadows[1],
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.caption.fontWeight,
        lineHeight: theme.typography.caption.lineHeight,
        position: 'relative',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid',       
    },
    // [`& .${tooltipClasses.arrow}`]: {
    // //     // border: '1px solid',       
    //     color: theme.palette.common.white,
    //     '&::before': {
    //         content: '""',
    //         // boxShadow: theme.shadows[1],
    // //         position: 'absolute',                   
    //         bottom: '-0.4rem', // Adjust based on the size of the arrow
    // //         left: '50%',
    // //         transform: 'translateX(-50%)',
    //         borderWidth: '1rem', // Adjust based on the size of the arrow
    //         borderStyle: 'solid',
    //         borderColor: 'white transparent transparent transparent', // White fill for the arrow
    // //         zIndex: 100,
    //     },
    //     '&::after': {
    //         content: '""',
    // //         position: 'absolute',
    // //         bottom: '-0.5rem', // Adjust based on the size of the arrow
    // //         left: '50%',
    // //         transform: 'translateX(-50%)',
    //         borderWidth: '1rem', // Adjust based on the size of the arrow
    //         borderStyle: 'solid',
    //         borderColor: 'black transparent transparent transparent', // Black border for the arrow
    // //         zIndex: 99,
    //     },
    // },
}));
    

type HouseholdTooltipProps = TooltipProps & {
    title: string;
    children: React.ReactElement;
};

const HouseholdTooltip: React.FC<HouseholdTooltipProps> = ({ title, children, ...props }) => {
    const theme = useTheme();
    
    return (
        // <StyledTooltip title={title} {...props} arrow theme={theme}> with Arrow
        <StyledTooltip title={title} {...props} theme={theme}>
            {children}
        </StyledTooltip>
    );
};


export default HouseholdTooltip;