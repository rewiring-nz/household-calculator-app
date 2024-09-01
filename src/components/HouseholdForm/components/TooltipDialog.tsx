import { styled, Theme, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const Dialog = styled('dialog')(({ theme }: { theme: Theme }) => ({
    position: 'absolute',
    top: 0,
    // left: '50%',
    // transform: 'translateX(-50%) translateY(-100%)',
    transform: 'translateY(-100%)',
    border: '1px solid #000',
    // border: 'none',
    padding: '1rem',
    // padding: '1rem 1.2rem',
    borderRadius: '4px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 99,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',    
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-0.4rem', // Adjust based on the size of the arrow
        left: '50%',
        // transform: 'translateX(-50%)',
        // transform: 'translateX(-50%) translateY(50%)',
        transform: `translateX(-50%) translateY(calc(50% + 0.045rem))`, // sweet spot 1.2px | 0.075rem
        borderWidth:  '1rem', // '8px', Needs to be larger to cover after moving + 0.075rem
        borderStyle: 'solid',
        borderColor: 'white transparent transparent transparent', // White fill for the arrow
        width: 0,
        height: 0,
        zIndex: 100,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-0.5rem', // Adjust based on the size of the arrow
        left: '50%',
        // transform: 'translateX(-50%)',
        transform: 'translateX(-50%) translateY(50%)',
        // transform: `translateX(-50%) translateY(calc(50% + 0.625rem))`,
        borderWidth: '0.5rem', // '10px',
        borderStyle: 'solid',
        borderColor: 'black transparent transparent transparent', // Black border for the arrow
        width: 0,
        height: 0,
    },
}));
    

type TooltipDialogProps = {
    open: boolean;
    handleClose: () => void;
    text: string;
    // mouseX: number;
    // mouseY: number;
    // iconRef: React.RefObject<HTMLElement>;
};

const TooltipDialog = ({ open, handleClose, text }: TooltipDialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const theme = useTheme();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, handleClose]);

    
    // useEffect(() => {
    //     if (dialogRef.current) {
    //         const dialog = dialogRef.current;
    //         const dialogWidth = dialog.offsetWidth;
    //         const dialogHeight = dialog.offsetHeight;
    //         const viewportWidth = window.innerWidth;
    //         const viewportHeight = window.innerHeight;

    //         let top = mouseY;
    //         let left = mouseX;

    //         if (mouseX + dialogWidth > viewportWidth) {
    //             left = viewportWidth - dialogWidth - 10; // 10px padding from the edge
    //         }

    //         if (mouseY + dialogHeight > viewportHeight) {
    //             top = viewportHeight - dialogHeight - 10; // 10px padding from the edge
    //         }

    //         top -= dialogHeight + 10; // 10px above the mouse click
    //         left -= dialogWidth / 2; // Center horizontally

    //         dialog.style.top = `${top}px`;
    //         dialog.style.left = `${left}px`;
    //     }
    // }, [mouseX, mouseY, open]);

    // useEffect(() => {
    //     if (dialogRef.current && iconRef.current) {
    //         const dialog = dialogRef.current;
    //         const iconRect = iconRef.current.getBoundingClientRect();
    //         const dialogWidth = dialog.offsetWidth;
    //         const dialogHeight = dialog.offsetHeight;

    //         const top = iconRect.top - dialogHeight - 10; // 10px above the icon
    //         const left = iconRect.left + (iconRect.width / 2) - (dialogWidth / 2); // Center horizontally

    //         dialog.style.top = `${top}px`;
    //         dialog.style.left = `${left}px`;
    //     }
    // }, [iconRef, open]);

    if (!open) {
        return null;
    }



    return (
        // <dialog open={open} onClose={handleClose}>
        // <dialog ref={dialogRef} open={open}>
        //     <p>{text}</p>
        // </dialog>
        <Dialog ref={dialogRef} theme={theme} open={open}>
        {/* // <Dialog ref={dialogRef} theme={theme} open={open} style={{ top: mouseY, left: mouseX }}> */}
            {/* <p>{text}</p> */}
            <Typography variant='caption' >{text}</Typography>
        </Dialog>
    );
};

export default TooltipDialog;