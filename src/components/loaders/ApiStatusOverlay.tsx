import { Backdrop, CircularProgress, Fade, Typography, Button, Paper, Stack, styled } from "@mui/material";
import { useApiState } from "../../state/api/ApiStateContext";
import { borderTokens } from "../../theme/tokens/borders";

const StyledNoticeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  textAlign: 'center',
  // Generic Brand Accent using the primary color
  borderTop: `${borderTokens.width.accent} solid ${theme.palette.primary.main}`,
}));

const ApiStatusOverlay = () => {
  const { loading, isTimedOut, resetApiState } = useApiState();

  return (
    <Backdrop open={loading || isTimedOut}
    sx={{ 
      // theme.zIndex.modal is 1300. We add + 10 to ensure it beats 
      // sticky table headers or drawers.
      zIndex: (theme) => theme.zIndex.modal + 10, 
      color: 'common.white',
      flexDirection: 'column',
    }}>
      <Fade in={loading} unmountOnExit>
        <CircularProgress color="primary" />
      </Fade>

      <Fade in={isTimedOut} unmountOnExit>
        <StyledNoticeBox elevation={12}>
          <Stack spacing={3}>
            <Typography variant="h6" color="secondary" fontWeight="bold">
              Service Update
            </Typography>
            <Typography variant="body2" color="textPrimary">
              The request is taking longer than expected. We appreciate your patience. 
              You can close this notice to return to your dashboard.
            </Typography>
            <Button variant="contained" onClick={resetApiState} fullWidth>
              Close Notice
            </Button>
          </Stack>
        </StyledNoticeBox>
      </Fade>
    </Backdrop>
  );
};

export default ApiStatusOverlay;