import { createTheme, alpha } from '@mui/material/styles';

export const black = 'rgba(0, 0, 0, 1)';
export const white = 'rgba(255, 255, 255, 1)';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: white,
      contrastText: black,
    },
    secondary: {
      main: alpha(white, 0.8),
    },
    background: {
      black: black,
      default: alpha(black, 0.6),
      paper: alpha(black, 0.75),
    },
    text: {
      primary: white,
      secondary: alpha(white, 0.7),
      disabled: alpha(white, 0.5),
    },
  },

  shape: {
    borderRadius: 4,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          color: alpha(white, 1),
          backgroundColor: alpha(black, 1),
          transition: 'all 0.25s',
          '&:hover': {
            backgroundColor: alpha(black, 0.8),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(black, 1),
            '&:hover': {
              backgroundColor: alpha(black, 1),
            },
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(black, 0.1),
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(black, 0.75),
          backdropFilter: 'blur(6px)',
          color: white,
          '&:hover': {
            backgroundColor: alpha(black, 1),
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
          backdropFilter: 'blur(5px)',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            color: white,
            backgroundColor: alpha(black, 0.5),
            '& fieldset': {
              borderColor: alpha(white, 0.3),
            },
            '&:hover fieldset': {
              borderColor: alpha(white, 0.7),
            },
            '&.Mui-focused fieldset': {
              borderColor: white,
            },
          },
          '& .MuiInputLabel-root': {
            color: alpha(white, 0.7),
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: white,
          },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          color: alpha(white, 1),
          backgroundColor: alpha(black, 0.1),
          transition: 'all 0.25s',
          '&:hover': {
            backgroundColor: alpha(black, 0.5),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(black, 1),
            '&:hover': {
              backgroundColor: alpha(black, 1),
            },
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(black, 0.1),
          },
          '&.Mui-selected.Mui-disabled': {
            backgroundColor: alpha(black, 1),
          },
        },
      },
    },


    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          backgroundColor: alpha(black, 0.1),
          backdropFilter: 'blur(6px)',
          padding: 2,
        },
        grouped: {
          margin: 2,
          '&:not(:first-of-type)': {
            borderRadius: 40,
          },
          '&:first-of-type': {
            borderRadius: 40,
          },
        },
      },
    },

    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
  },
});

export default theme;
