import { createTheme } from '@mui/material/styles';

// ---- Design tokens -------------------------------------------------------
// Background:  near-black, slightly warm so panels don't feel clinical
// Accent:      electric violet - the "signature" color used sparingly for
//              active states, primary actions and the logo mark
// Secondary:   warm amber - used only for the play/pause affordance
export const tokens = {
  bg: '#0E0E12',
  surface: '#16161C',
  surfaceRaised: '#1E1E26',
  border: '#2A2A33',
  textPrimary: '#F5F5F7',
  textSecondary: '#9C9CA8',
  accent: '#7C5CFF',
  accentHover: '#9077FF',
  amber: '#FFB454',
  danger: '#FF6161',
  success: '#3DDC97',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: tokens.bg,
      paper: tokens.surface,
    },
    primary: {
      main: tokens.accent,
      light: tokens.accentHover,
    },
    secondary: {
      main: tokens.amber,
    },
    error: {
      main: tokens.danger,
    },
    success: {
      main: tokens.success,
    },
    text: {
      primary: tokens.textPrimary,
      secondary: tokens.textSecondary,
    },
    divider: tokens.border,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surfaceRaised,
          borderRadius: 8,
          '&:before, &:after': { display: 'none' },
        },
      },
    },
  },
});

export default theme;
