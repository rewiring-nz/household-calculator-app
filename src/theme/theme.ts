import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Poppins, Rubik, sans-serif",
    h1: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "2.125rem", // 16 * 2.125 = 34px
      fontWeight: 700,
      lineHeight: "2.55rem",
      margin: "0.8rem 0 0.6rem 0",
      // letterSpacing: '0.028rem',  letterSpacing: md ? '0' : '0.028rem',
      color: "#222222",
    },
    h2: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.75rem", //28px    '1.5rem',  = 24px
      fontWeight: 700,
      lineHeight: "1.8rem", // 28.8px
      margin: "0.6rem 0 0.2rem 0",
      // letterSpacing: '0.022rem'
    },
    h3: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.0625rem", // = 17px
      fontWeight: 600,
      lineHeight: "1.2rem", // 19px
      margin: "1rem 0 1.5rem 0",
      // letterSpacing: '0.02rem',
      color: "#3A3A3A",
    },
    h4: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.0625rem", // 17px
      fontWeight: 600,
      // lineHeight: '0.75rem',
      // letterSpacing: '.04rem',
      margin: "0.5rem 0 0.5rem 0",
      color: "#000000",
    },
    h5: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1rem",
      fontWeight: 600,
      // lineHeight: '0.75rem',
      margin: "1.1rem 0",
      // letterSpacing: '.04rem'
    },
    h6: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "0.81rem", // 12.96px   '0.75rem',
      fontWeight: 700,
      lineHeight: "0.94rem",
      letterSpacing: ".04rem", // required
    },
    subtitle1: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.3125rem", // 21px // 16 * 1.25 = 20px
      fontWeight: 400,
      lineHeight: "1.7rem",
      margin: "0.5rem 0 0.5rem 0",
      color: "#3A3A3A",
    },
    subtitle2: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.1875rem", // 19px //  1.125rem = 18px
      fontWeight: 400,
      lineHeight: "1.6rem",
    },
    body1: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1.0625rem", // 17px
      fontWeight: 400,
      lineHeight: "1.49rem",
    },
    body2: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "1rem", // 0.94rem  ~15px
      fontWeight: 400,
      lineHeight: "1.22rem",
    },
    caption: {
      fontFamily: "Rubik, Roboto, sans-serif",
      fontSize: "0.9rem", // 0.94rem  ~15px  '0.75rem',
      fontWeight: 400,
      lineHeight: "1.3125rem",
    },
  },
  palette: {
    primary: {
      main: "#E7EFE8",
      // light: '#9d46ff', will be calculated from palette.primary.main
      // dark: '#0a00b6',
      // contrastText: '#ffffff',
    },
    secondary: {
      main: "#527570",
    },
    error: {
      main: "#EB5757", // '#b00020'
    },
    warning: {
      main: "#e97840", // '#ff9800'
      light: "#ffcac0"
    },
    info: {
      main: "#FFC754",
      dark: "#F1B029",
    },
    success: {
      main: "#4caf50", // 2E7D32
      light: "#e6f8d3", // 2E7D32
    },
    text: {
      primary: "#222222", // '#000000', //'#2E2E2E', //#3A3A3A
      secondary: "#2E2E2E", //'#3A3A3A', //#AAAAAA
      disabled: "#9e9e9e", // #BCBCBC
    },
    background: {
      default: "#FDFAF1", // #527570
      paper: "#ffffff",
    },
    divider: "#d7d5cd",
    action: {
      // active: '#2D62FF',
      // hover: '#9d46ff',
      // selected: '#2D62FF', //'#6200ea',
      // disabled: '#9e9e9e',
      disabledBackground: "#CCCCCC",
      focus: "#2D62FF",
      // hoverOpacity: 0.08,
      // disabledOpacity: 0.38,
      // focusOpacity: 0.12,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.25rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            // color: '#192D30',
            color: "#222222",
            // color: '#2E2E2E',
            // '&:hover:not(.Mui-disabled):before': {
            //     borderColor: '#2D62FF',
            // },
            // '&.Mui-focused:before': {
            //     borderColor: '#2D62FF',
            // },
            // '&.Mui-focused': {
            //     color: '#000000',
            //     // borderColor: '#2D62FF',
            // },
          },
          "& .MuiFormLabel-root": {
            color: "#2E2E2E",
            // color: '#222222',
            // '&.Mui-focused:before': {
            //     color: '#2E2E2E',
            // },
            "&.Mui-focused": {
              color: "#000000",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D0D0D0",
            },
            "&:hover fieldset": {
              // borderColor: '#2D62FF',
              borderColor: "#000000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2D62FF",
            },
          },
          "& .MuiSelect-select": {
            "&:focus": {
              // color: '#2D62FF',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 630, // 600
      md: 1000, // 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
