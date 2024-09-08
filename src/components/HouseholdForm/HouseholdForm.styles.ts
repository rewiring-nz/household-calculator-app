import { styled } from '@mui/system';
import { Box, PopperProps, Theme, FormLabel, FormControl, Button, MenuItem, ListItemIcon, Select, SelectProps, InputAdornment } from "@mui/material";
// import { theme } from "../../theme/theme";
import { ReactComponent as chevronDown} from '../../assets/icons/chevron-down.svg';


export const ResetButton = styled('button')(({ theme }: { theme: Theme }) => ({
// export const ResetButton = styled(Button)(({ theme }: { theme: Theme }) => ({
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

  // export const FormQuestionLabel = styled(FormLabel)(({ theme }: { theme: Theme }) => ({
//   export const FormQuestionLabel = styled(FormLabel)(() => ({
//     margin: '0.3rem 0'
// }));

export const SwitchLabel = styled(FormLabel)(({ theme }: { theme: Theme }) => ({
  // fontSize: '0.875rem',
  fontSize: theme.typography.body2.fontSize,
  // color: theme.palette.text.primary,
  color: theme.palette.common.black,
  display: 'inline-block',
  whiteSpace: 'nowrap',
  marginRight: '0.5rem',
  textDecoration: 'none',
  // '&:hover': {
  //   color: theme.palette.text.primary,
  // },
  // '&.Mui-focused': {
  //   color: theme.palette.text.primary,
  // },
  // '&.Mui-active': {
  //   color: theme.palette.text.primary,
  // }
}));

export const FormContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'space-between',
}));

export const FormSection = styled(Box)(( { theme }: { theme: Theme }) => ({
    // margin: '0.2rem 0',
    margin: '0.4rem 0',
    display: 'flex',
    flexDirection: 'column',
    // gap: '1rem'
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: '1.5rem',
        // flexWrap: 'wrap',
        // '& > *': {
        //     flexBasis: 'calc(50% - 0.5rem)', // Adjust the width of each child element
        //     maxWidth: 'calc(50% - 0.5rem)', // Ensure it doesn't exceed 50% width
        // }
    }
}));

export const LabelBox = styled(Box)(() => ({
  // margin: '0 0 0.6rem 0',
  display: 'flex',
  alignItems: 'center',
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
    // '& .tooltip-logo': {
    //     width: '1.3rem',
    //     height: '1.3rem',
    //     marginLeft: '0.5rem',
    //     cursor: 'pointer',
    //     marginRight: '0.5rem',
    // },
    '& .MuiInputBase-root': {
      margin: '0.6rem 0',
      // borderRadius: '0.44rem',
      // border: `0.19rem solid ${theme.palette.divider}`,
      // borderWidth: '2px'            
      backgroundColor: theme.palette.background.paper,
      // color: theme.palette.text.primary,
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
        // margin: '0 0 0.6rem 0',
        color: theme.palette.common.black,
        // '&.Mui-focused': {
        //     color: theme.palette.text.primary,
        // },
        // '&.Mui-active': {
        //     color: theme.palette.text.primary,
        // }
    },
    // '& .MuiSelect-select': {
    //   backgroundColor: theme.palette.background.paper,
    //   color: '#192D30', // theme.palette.text.primary,
    //   fontWeight: '500',
    // //   border: `0.19rem solid ${theme.palette.divider}`,
    // //   borderRadius: '0.44rem'
    // },
    '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row',
      // margin: '0 0 0.6rem 0',
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
      // flexBasis: 'calc(50% - 2rem)', // 2 columns on medium and up screens
      // maxWidth: 'calc(50% - 2rem)',
      flexBasis: 'calc(50% - 1rem)',
      maxWidth: 'calc(50% - 1rem)'
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
  // '& .MuiSelect-select': {
  //     backgroundColor: theme.palette.background.paper,
  //     color: theme.palette.text.primary,
  //     fontWeight: '500',
  // },
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



//   export const StyledMenuItem = styled(MenuItem)(({ theme }: { theme: Theme }) => ({
//     display: 'flex',
//     justifyContent: 'space-between',
//     '&.Mui-selected': {
//         // backgroundColor: '#C0D4C1', // Change selected background color
//         '&:hover': {
//           backgroundColor: theme.palette.primary.main,
//         },
//     },
//     '&:hover': {
//       backgroundColor: theme.palette.primary.main,
//     },
// }));

// export const StyledListItemIcon = styled(ListItemIcon)(({ theme }: { theme: Theme }) => ({
//   minWidth: 'auto',
//   marginRight: theme.spacing(1),
//   color: theme.palette.primary.main,
// }));


// export const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
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