
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../../theme/ThemeContext';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun

export const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit" title="Toggle theme">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};