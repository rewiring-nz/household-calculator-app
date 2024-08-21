import { styled } from '@mui/system';
import { Switch, SwitchProps } from '@mui/material';
import { Theme } from "@mui/material";


// export const IOSSwitch = styled((props: SwitchProps) => <Switch {...props} />)(({ theme }: { theme: Theme }) => ({

export const IOSSwitch = styled(Switch)(({ theme }: { theme: Theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        backgroundColor: '#000', // theme.palette.primary.dark,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      // color: theme.palette.background.paper,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundColor: theme.palette.grey[400], // Set the thumb color when unchecked
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    // backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    // backgroundColor: theme.palette.grey[300],
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));