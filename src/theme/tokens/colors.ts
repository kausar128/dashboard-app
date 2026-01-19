export const baseColors = {
  // Brand
  primaryMain: '#D71E28',
  secondaryMain: '#002D56',
  
  // Neutrals (Light Mode)
  neutral100: '#FFFFFF', // Surfaces
  neutral200: '#F7F7F7', // Backgrounds
  neutral900: '#1A2027', // Main Text
  
  // Neutrals (Dark Mode)
  darkBackground: '#0A1929',
  darkSurface: '#001E3C',
  
  // Semantic States
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#ED6C02',
  info: '#0288D1',
};

export const lightPalette = {
  primary: baseColors.primaryMain,
  secondary: baseColors.secondaryMain,
  background: baseColors.neutral200,
  surface: baseColors.neutral100,
  text: baseColors.neutral900,
  success: baseColors.success,
  error: baseColors.error,
  warning: baseColors.warning,
  info: baseColors.info,
};

export const darkPalette = {
  primary: '#FF4D4D',
  secondary: '#A5C7E9',
  background: baseColors.darkBackground,
  surface: baseColors.darkSurface,
  text: baseColors.neutral100,
  success: '#66BB6A',
  error: '#F44336',
  warning: '#FFA726',
  info: '#29B6F6',
};