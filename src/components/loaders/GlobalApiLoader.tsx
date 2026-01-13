import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { useApiState } from "../../state/api/ApiStateContext";

export const GlobalApiLoader = () => {
  const { loading } = useApiState();

  return (
    <Backdrop 
      open={loading} 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff' 
      }}
    >
      {/* Replacing motion.div with MUI's Fade transition */}
      <Fade in={loading} timeout={500} unmountOnExit>
        <CircularProgress color="inherit" />
      </Fade>
    </Backdrop>
  );
};
