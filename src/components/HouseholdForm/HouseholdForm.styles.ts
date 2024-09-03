import { styled } from '@mui/system';
import { Box, PopperProps, Theme, FormLabel } from "@mui/material";
// import { theme } from "../../theme/theme";

export const ResetButton = styled('button')(({ theme }: { theme: Theme }) => ({
    justifyContent: 'flex-end',  
    margin: '1rem 0 0.8rem 0',
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

  // export const FormQuestionLabel = styled(FormLabel)(({ theme }: { theme: Theme }) => ({
  export const FormQuestionLabel = styled(FormLabel)(() => ({
    margin: '0.3rem 0'
}));

export const SwitchLabel = styled(FormLabel)(({ theme }: { theme: Theme }) => ({
  display: 'inline-block',
  whiteSpace: 'nowrap',
  marginRight: '0.8rem',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
  '&.Mui-active': {
    color: theme.palette.text.primary,
  }
}));

export const FormContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.4rem',
    justifyContent: 'space-between',
}));

export const FormSection = styled(Box)(( { theme }: { theme: Theme }) => ({
    margin: '0.2rem 0',
    display: 'flex',
    flexDirection: 'column',
    // gap: '1rem'
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: '1rem',
        // flexWrap: 'wrap',
        // '& > *': {
        //     flexBasis: 'calc(50% - 0.5rem)', // Adjust the width of each child element
        //     maxWidth: 'calc(50% - 0.5rem)', // Ensure it doesn't exceed 50% width
        // }
    }
}));

export const FormVehicle = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    // '& .MuiFormControl-root': {
    //     width: '100%',
    //     flexBasis: '100%'
    // },
    '& .MuiFormLabel-root': {
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



export const FormBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.default,  
    // display: 'flex',
    flexGrow: 1,
    flexBasis: '100%',
    maxWidth: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   flexBasis: 'calc(100% / 2) - 1rem', // 2 columns on medium and up screens
    //   maxWidth: 'calc(100% / 2) - 1rem'
    // },
    '& > .MuiBox-root': {
      // display: 'flex',
      width: '100%', 
      flexBasis: '100%', // Full width on small screens
      // [theme.breakpoints.up('sm')]: {
      //   flexBasis: 'calc(100% / 2) - 10px', // 2 columns on medium and up screens
      //   maxWidth: 'calc(100% / 2) - 10px'
      // }
    },
    '& .MuiDivider-root': {
        // borderColor: theme.palette.divider, #d7d5cd
        borderBottomWidth: '0.1rem'
    },
    // '& .MuiFormControl-root': {
    '& .fullFormControl': {
      margin: '0',
      // width: '100%',
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
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontWeight: '500',
      '& input[type=number]': {
      '-moz-appearance': 'textfield', // Firefox
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none', // Chrome, Safari, Edge, Opera
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none', // Chrome, Safari, Edge, Opera
        margin: 0,
      },
    },
    },
    // '& .MuiFormLabel-root': {
    // '& .mainLabels': {
    //     margin: '0.8rem 0',
    //     color: theme.palette.text.primary,
    //     '&.Mui-focused': {
    //         color: theme.palette.text.primary,
    //     },
    //     '&.Mui-active': {
    //         color: theme.palette.text.primary,
    //     }
    // },
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

  export const HalfWidthFormBox = styled(FormBox)(({ theme }: { theme: Theme }) => ({
    flexBasis: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      flexBasis: 'calc(50% - 2rem)', // 2 columns on medium and up screens
      maxWidth: 'calc(50% - 2rem)'
    }
  }));

// export default FormBox;