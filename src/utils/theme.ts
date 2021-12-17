import { red } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#3766f4",
    },
    secondary: {
      main: "#8072e0",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#171717",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          color: "#171717",

          "&:hover, &.active": {
            color: "#3766f4",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          boder: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
