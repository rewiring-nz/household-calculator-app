import { styled } from '@mui/system';
import { Box, PopperProps, Theme, FormLabel, FormControl, Button, MenuItem, ListItemIcon, Select, SelectProps, InputAdornment } from "@mui/material";
// import { theme } from "../../theme/theme";
import { ReactComponent as chevronDown} from '../../assets/icons/chevron-down.svg';


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
    '&.Mui-focused': {
        color: theme.palette.text.primary, 
    },
    '& p': {
      marginLeft: '0.2rem'
    }
  }));


export const SwitchLabel = styled(FormLabel)(({ theme }: { theme: Theme }) => ({  
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.common.black,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  marginRight: '0.5rem',
  textDecoration: 'none',
}));

export const FormContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'space-between',
}));

export const FormSectionFlex = styled(Box)(( { theme }: { theme: Theme }) => ({  
  margin: '0.4rem 0',
  display: 'flex',
  width: '100%',
  gap: '1rem',
  justifyContent: 'space-between',
  flexWrap: 'wrap', // Ensure items wrap when they exceed the available space
  // // '& > *': {
  // '& .MuiFormControl-root': {
  //   // flex: '1 1 auto', // Allow items to grow and shrink as needed
  //   // minWidth: 'fit-content', // Ensure items have a minimum width of fit-content
  //   width: 'clamp(200px, auto, calc(50% - 1rem))', // Use clamp to set min, preferred, and max width
  //   // maxWidth: 'calc(50% - 1rem)', // Ensure items don't exceed half width minus gap
  //   maxWidth: '100%',
  //   // whiteSpace: 'nowrap', // Ensure no line breaks
  //   // [theme.breakpoints.up('sm')]: {
  //   //   flex: '1 1 calc(50% - 1rem)', // Allow items to grow and shrink, default to half width minus gap on larger screens
  //   //   maxWidth: 'calc(50% - 1rem)', // Ensure items don't exceed half width minus gap on larger screens
  //   // },
  //   // '& > *:first-child': {
  //   //   minWidth: 'fit-content', // Ensure the first child has a minimum width of fit-content
  //   // },
  // },
  // // '& MuiFormLabel-root': {
  // //   whiteSpace: 'nowrap',
  // // }
}));

export const FormSectionGrid = styled(Box)(( { theme }: { theme: Theme }) => ({
    display: 'grid',
    width: '100%',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
}));

export const LabelBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',
  '& img': {
    marginRight: '0.7rem',
    width: '1.125rem',
    height: '1.125rem',
    marginLeft: '0.7rem',
    cursor: 'pointer',
  }
}));


export const FormBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.default,      
    flexGrow: 1,
    flexBasis: '100%',
    maxWidth: '100%',
    '& > .MuiBox-root': {
      width: '100%', 
      flexBasis: '100%', // Full width on small screens
      // [theme.breakpoints.up('sm')]: {
      //   flexBasis: 'calc(100% / 2) - 10px', // 2 columns on medium and up screens
      //   maxWidth: 'calc(100% / 2) - 10px'
      // }
    },
    '& .MuiDivider-root': {        
        borderBottomWidth: '0.1rem'
    },
    
    '& .fullFormControl': {
      margin: '0',    
      // flexBasis: '100%', // Full width on small screens    
      flex: '1'
    },    
    '& .MuiInputBase-root': {
      margin: '0.6rem 0',
      backgroundColor: theme.palette.background.paper,
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
    '& .MuiFormLabel-root': {    
        color: theme.palette.common.black,        
    },    
    '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row',      
    },
    '& .MuiButtonBase-root': {
      color: theme.palette.common.black,
      '&.Mui-checked': {
        color: theme.palette.common.black,
      }
    }      
  }));

  export const HalfWidthFormBox = styled(FormBox)(({ theme }: { theme: Theme }) => ({
    flexBasis: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      flexBasis: 'calc(50% - 1rem)',
      maxWidth: 'calc(50% - 1rem)'
    }
  }));

  
export const FormVehicle = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
      '&.Mui-focused': {
          color: theme.palette.text.primary,
      },
      '&.Mui-active': {
          color: theme.palette.text.primary,
      }
  },
  '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row'
  },
  '& .MuiButtonBase-root': {
      color: theme.palette.secondary,
      '&.Mui-checked': {
          color: theme.palette.secondary
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



export const HouseSelect = styled(Select)(() => ({  
  '& .MuiSelect-icon': {
      right: '1rem'
  },
}));

export const HouseInputAdornment = styled(InputAdornment)(({ theme }) => ({
  '& p': {
    color: '#AAAAAA'
  } 
}));