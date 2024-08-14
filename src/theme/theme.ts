import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Poppins, Rubik, sans-serif', 
        h1: {
            fontFamily: 'Rubik, Roboto, sans-serif',
            fontSize: '2.125rem', // 16 * 2.125 = 34px
            fontWeight: 700,
            lineHeight: '2.55rem',
            margin: '0.8rem 0 0.6rem 0',
            letterSpacing: '0.028rem'
        },
        h2: {
            fontFamily: 'Rubik, Roboto, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '1.8rem',
            margin: '0.9rem 0',
            letterSpacing: '0.022rem'
        },
        h3: {
            fontFamily: 'Rubik, Roboto, sans-serif',
            fontSize: '1rem', // = 16px
            fontWeight: 600,
            lineHeight: '1.2rem',
            margin: '0.9rem 0',
            letterSpacing: '0.02rem'
        },
        h4: {
            fontFamily: 'Rubik, Roboto, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: '0.94rem'
        },
        subtitle1: {
            fontFamily: 'Poppins, Roboto, sans-serif',
            fontSize: '1.25rem', // 16 * 1.25 = 20px
            fontWeight: 400,
            lineHeight: '1.63rem',
            margin: '0.5rem 0 1rem 0'
        },
        subtitle2: {
            fontFamily: 'Poppins, Roboto, sans-serif',
            fontSize: '1.125rem', // 18px
            fontWeight: 400,
            lineHeight: '1.69rem'
        },
        body1: {
            fontFamily: 'Poppins, Roboto, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.69rem'
        },
        body2: {
            fontFamily: 'Poppins, Roboto, sans-serif',
            fontSize: '0.94rem', // ~15px
            fontWeight: 500,
            lineHeight: '1.22rem'
        },
    },
    palette: {
        primary: {
            main: '#E7EFE8',
            // light: '#9d46ff', will be calculated from palette.primary.main
            // dark: '#0a00b6',
            // contrastText: '#ffffff', 
        },
        secondary: {
            main: '#527570'
        },
        error: {
            main: '#b00020'
        },
        warning: {
            main: '#e97840' // '#ff9800'
        },
        info: {
            main: '#FFC754'
        },
        success: {
            main: '#4caf50' // 2E7D32
        },
        text: {
            primary: '#000000', //'#2E2E2E', //#3A3A3A
            secondary: '#3A3A3A', 
            disabled: '#9e9e9e'
        },
        background: {
            default: '#FDFAF1',  // #527570
            paper: '#ffffff'            
        },
        divider: '#d7d5cd',
        // action: {
        //     active: '#6200ea',
        //     hover: '#9d46ff',
        //     selected: '#6200ea',
        //     disabled: '#9e9e9e',
        //     disabledBackground: '#e0e0e0' 
        // },
    },  
    spacing: 8, // Default spacing unit
});

export default theme;


