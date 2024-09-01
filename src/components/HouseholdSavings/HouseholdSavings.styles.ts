import { Link, LinkProps, Theme } from '@mui/material';
import { styled } from '@mui/system';


// export const HouseLink = styled(Link)<LinkProps>(({ theme }: { theme: Theme }) => ({
//     color: '#2D62FF',
//     textDecoration: 'none',
//     // '&:hover': {
//     //     textDecoration: 'underline',
//     // },
// }));


export const HouseLink = styled(Link)<LinkProps>(({ theme }) => ({    
    color: '#2D62FF',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
  }));