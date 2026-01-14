import { 
  Backdrop, 
  CircularProgress, 
  Fade, 
  Typography, 
  Button, 
  Paper, 
  Stack,
  styled
} from "@mui/material";
import { useApiState } from "../../state/api/ApiStateContext";  

const StyledNoticeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 360,
  width: '90%',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
}));

const ApiStatusOverlay = () => {
  const { loading, isTimedOut, resetApiState } = useApiState();

  return (
    <Backdrop
      open={loading || isTimedOut}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: 'common.white',
        flexDirection: 'column',
        //enable blur and darken effect if desired
        // backdropFilter: 'blur(2px)',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Fade in={loading} unmountOnExit>
        <CircularProgress color="inherit" />
      </Fade>

      <Fade in={isTimedOut} unmountOnExit>
        <StyledNoticeBox elevation={12}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" color="text.primary" fontWeight="bold">
              Notice
            </Typography>

            <Typography variant="body2" color="text.secondary">
              The request is taking longer than expected. You can stay on this page or try again later.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={resetApiState}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Close
            </Button>
          </Stack>
        </StyledNoticeBox>
      </Fade>
    </Backdrop>
  );
};

export default ApiStatusOverlay;