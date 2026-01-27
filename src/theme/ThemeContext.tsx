import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { ThemeProvider, PaletteMode, CssBaseline } from '@mui/material';
import { getCustomTheme } from './index';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    return (localStorage.getItem('theme-pref') as PaletteMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-pref', mode);
  }, [mode]);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  }), []);

  const theme = useMemo(() => getCustomTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);