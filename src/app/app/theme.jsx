import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system"; // For color adjustments

// Base primary color
const primaryMain = "#1976d2";

// Generate secondary from primary tone
const secondaryMain = lighten(primaryMain, 0.5);

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: lighten(primaryMain, 0.3),
      main: primaryMain,
      dark: darken(primaryMain, 0.2),
      contrastText: "#ffffff",
    },
    secondary: {
      light: lighten(secondaryMain, 0.3),
      main: secondaryMain,
      dark: darken(secondaryMain, 0.2),
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: 20,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: lighten(primaryMain, 0.3),
      main: primaryMain,
      dark: darken(primaryMain, 0.2),
      contrastText: "#ffffff",
    },
    secondary: {
      light: lighten(secondaryMain, 0.3),
      main: secondaryMain,
      dark: darken(secondaryMain, 0.2),
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

  },
});
