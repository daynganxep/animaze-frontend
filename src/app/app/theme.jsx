import { createTheme, alpha } from '@mui/material/styles';

const black = '#000000';
const white = '#ffffff';

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
    borderRadius: 20,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          color: white,
          backgroundColor: alpha(black, 0.6),
          border: `1px solid ${alpha(white, 0.3)}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(white, 0.15),
            borderColor: alpha(white, 0.5),
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(black, 0.5),
          backdropFilter: 'blur(6px)',
          color: white,
          '&:hover': {
            backgroundColor: alpha(black, 0.8),
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          backgroundColor: alpha(black, 0.75),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
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
          color: white,
          backgroundColor: alpha(black, 0.5),
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(black, 0.8),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(black, 1),
            color: white,
            '&:hover': {
              backgroundColor: alpha(black, 0.8),
            },
          },
          '&.Mui-selected.Mui-disabled': {
            color: alpha(white, 0.4),
            backgroundColor: alpha(black, 0.2),
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
