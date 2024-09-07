import { Box, Link, LinkProps, Theme } from '@mui/material';
import { styled } from '@mui/system';
import RecommendationImage from './data/RecommendationImage';


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

export const SavingsFrameBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: '1rem 1.6rem',                    
    // margin: '1rem 0',
    // display: 'flex',
}));



  export const StyledRecommendationImage = styled(RecommendationImage)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    // marginBottom: '1rem',
    maxWidth: '8.125rem',
  }));

    