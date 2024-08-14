import { styled } from '@mui/system';
import { Box, PopperProps, Theme } from "@mui/material";
// import { theme } from "../../theme/theme";

export const ResetButton = styled('button')(({ theme }: { theme: Theme }) => ({
    margin: '1.8rem 0 0.8rem 0',
    display: 'flex',
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary
    },
    '& p': {
      marginLeft: '0.2rem'
    }
  }));

export const FormContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.4rem'
}));

export const tooltipPoppers: PopperProps = {
    modifiers: [
        {
            name: 'flip',
            options: {
                fallbackPlacements: ['top', 'bottom']
            }
        },
    ],
    open: false
};



const FormBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.default,  
    flexGrow: 1,
    flexBasis: '100%',
    [theme.breakpoints.up('sm')]: {
      flexBasis: 'calc(100% / 2) - 1rem', // 2 columns on medium and up screens
      maxWidth: 'calc(100% / 2) - 1rem'
    },
    '& > .MuiBox-root': {
      display: 'flex',
      width: '100%', 
      flexBasis: '100%', // Full width on small screens
      [theme.breakpoints.up('sm')]: {
        flexBasis: 'calc(100% / 2) - 10px', // 2 columns on medium and up screens
        maxWidth: 'calc(100% / 2) - 10px'
      }
    },
    '& .MuiDivider-root': {
        // borderColor: theme.palette.divider, #d7d5cd
        borderBottomWidth: '0.1rem'
    },
    '& .MuiFormControl-root': {
      width: '100%',
      flexBasis: '100%', // Full width on small screens
      // [theme.breakpoints.up('sm')]: {
      //   flexBasis: 'calc(100% / 2)', // 2 columns on medium and up screens
      //   maxWidth: 'calc(100% / 2)'
      // },
    },
    '& .tooltip-logo': {
        width: '1.3rem',
        height: '1.3rem',
        marginLeft: '0.5rem',
        cursor: 'pointer',
        marginRight: '0.5rem',
    },
    '& .MuiInputBase-root': {
        // borderRadius: '0.44rem',
        // border: `0.19rem solid ${theme.palette.divider}`,
        // borderWidth: '2px'
    },
    '& .MuiFormLabel-root': {
        margin: '0.8rem 0',
        color: theme.palette.text.primary,
        '&.Mui-focused': {
            color: theme.palette.text.primary,
        },
        '&.Mui-active': {
            color: theme.palette.text.primary,
        }
    },
    '& .MuiSelect-select': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontWeight: '500',
    //   border: `0.19rem solid ${theme.palette.divider}`,
    //   borderRadius: '0.44rem'
    },
    '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row'
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.text.secondary,
      '&.Mui-checked': {
        color: theme.palette.text.secondary
      }
    }      
  }));

export default FormBox;