import { Backdrop, CircularProgress, Fade, Box, Typography, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useApiState } from "../../state/api/ApiStateContext";

const ApiStatusOverlay = () => {
  const { loading, isTimedOut, resetApiState } = useApiState();
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  // Logic to handle the 10-second visibility window for the SLA error
  useEffect(() => {
    let autoHideTimer: ReturnType<typeof setTimeout>;

    if (isTimedOut) {
      setShowTimeoutMessage(true);

      // Auto-hide the entire overlay after 10 seconds if user doesn't click close
      autoHideTimer = setTimeout(() => {
        handleClose();
      }, 10000);
    }

    return () => clearTimeout(autoHideTimer);
  }, [isTimedOut]);

  const handleClose = () => {
    setShowTimeoutMessage(false);
    resetApiState(); // Clears loading, requestCount, and isTimedOut in the Provider
  };

  return (
    <Backdrop
      // Backdrop stays open if we are actively loading OR showing the SLA message
      open={loading || showTimeoutMessage}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: "#fff",
        flexDirection: "column",
      }}
    >
      {/* 1. The Active Spinner */}
      <Fade in={loading} unmountOnExit>
        <CircularProgress color="inherit" />
      </Fade>

      {/* 2. The Timeout Message Box */}
      <Fade in={showTimeoutMessage} unmountOnExit>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            maxWidth: 350, 
            textAlign: "center",
            borderRadius: 2 
          }}
        >
          <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            Notice
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            The request is taking longer than expected. You can stay on this page or try again later.
          </Typography>
          
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleClose}
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </Paper>
      </Fade>
    </Backdrop>
  );
};

export default ApiStatusOverlay;