import React, { useState } from 'react';
import { styled, Theme, useTheme } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';




const StyledTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: Theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.caption.fontWeight,
        lineHeight: theme.typography.caption.lineHeight,
        position: 'relative',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid',
    },
}));


type HouseholdTooltipProps = TooltipProps & {
    title: string;
    children: React.ReactElement;
    open?: boolean;
    onClose?: () => void;
};


const HouseholdTooltip: React.FC<HouseholdTooltipProps> = ({
    title,
    children,
    open: openProp,
    onClose: onCloseProp,
    ...props
}) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const handleTooltipClose = () => {
        setOpen(false);
        if (onCloseProp) {
            onCloseProp();
        }
    };

    return (
        <StyledTooltip
            {...props}
            title={title}
            theme={theme}
            open={openProp !== undefined ? openProp : open}
            onClose={handleTooltipClose}
            onClick={handleTooltipOpen}
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
            leaveTouchDelay={3000}
        >
            {children}
        </StyledTooltip>
    );
};


export default HouseholdTooltip;