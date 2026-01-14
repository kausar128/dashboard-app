import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';
import { lightPalette, darkPalette } from './tokens/colors';
import { borderTokens } from './tokens/borders';

export const getCustomTheme = (mode: PaletteMode): ThemeOptions => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.primary },
      secondary: { main: palette.secondary },
      background: {
        default: palette.background,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
      },
    },
    shape: {
      borderRadius: borderTokens.radius.small, 
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: borderTokens.radius.small,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: borderTokens.radius.medium,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' 
              ? 'rgba(0, 45, 86, 0.7)' // Themed semi-transparent overlay
              : 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
          },
        },
      },
    },
  });
};