import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';
import { lightPalette, darkPalette } from './tokens/colors';
import { borderTokens } from './tokens/borders';
import { typographyTokens } from './tokens/typography';
import { componentTokens } from './tokens/components';

/**
 * MODULE AUGMENTATION
 * We extend the MUI Theme interface to include our custom tokens.
 * This provides full IDE autocomplete when using theme.customBorders or theme.customComponents.
 */
declare module '@mui/material/styles' {
  interface Theme {
    customBorders: typeof borderTokens;
    customComponents: typeof componentTokens;
  }
  interface ThemeOptions {
    customBorders?: typeof borderTokens;
    customComponents?: typeof componentTokens;
  }
}

export const getCustomTheme = (mode: PaletteMode): ThemeOptions => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.primary },
      secondary: { main: palette.secondary },
      error: { main: palette.error },
      success: { main: palette.success },
      warning: { main: palette.warning },
      info: { main: palette.info },
      background: {
        default: palette.background,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
      },
    },

    // Global Accessibility: Attaching tokens directly to the theme object
    customBorders: borderTokens,
    customComponents: componentTokens,

    // MUI Standard Tokens
    shape: {
      borderRadius: borderTokens.radius.small, 
    },

    typography: {
      fontFamily: typographyTokens.fontFamily,
      h1: { fontSize: typographyTokens.sizes.h1, fontWeight: typographyTokens.fontWeight.bold },
      h2: { fontSize: typographyTokens.sizes.h2, fontWeight: typographyTokens.fontWeight.bold },
      h6: { 
        fontSize: typographyTokens.sizes.h6, 
        fontWeight: typographyTokens.fontWeight.bold 
      },
      body1: { fontSize: typographyTokens.sizes.body1 },
      body2: { fontSize: typographyTokens.sizes.body2 },
      fontWeightRegular: typographyTokens.fontWeight.regular,
      fontWeightMedium: typographyTokens.fontWeight.medium,
      fontWeightBold: typographyTokens.fontWeight.bold,
    },

    // Global Component Blueprints
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: typographyTokens.fontWeight.semibold,
            borderRadius: componentTokens.button.borderRadius,
            padding: componentTokens.button.padding,
            minHeight: componentTokens.button.height,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: componentTokens.card.borderRadius,
            padding: componentTokens.card.padding,
          },
        },
        defaultProps: {
          elevation: componentTokens.card.elevation,
        }
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            // Level 1400 ensures we are above Tables (1000) and AppBars (1100)
            zIndex: 1400, 
            backgroundColor: mode === 'light' 
              ? 'rgba(0, 45, 86, 0.7)' 
              : 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: componentTokens.input.borderRadius,
            }
          }
        }
      }
    },
  });
};