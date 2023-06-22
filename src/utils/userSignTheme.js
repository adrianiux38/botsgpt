import { green, purple } from '@mui/material/colors';
import { createTheme }  from '@mui/material';

export const userSignTheme = createTheme({
    palette: {
        primary: {
          main: purple[500],
        },
        default: {
          main: green[500],
        },
        backbutton: {
            main: purple[100],
        },
        success: {
            main: purple[400],
        },
        basic: {

        }
      },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: '20px',
          },
        },
      },
    },
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  });