import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const TopNavBar = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard App
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            disabled={pathname === "/"}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            disabled={pathname === "/dashboard"}
          >
            Dashboard
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
