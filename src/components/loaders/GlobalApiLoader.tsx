import { Backdrop, CircularProgress, Fade } from "@mui/material";
import { useApiState } from "../../state/api/ApiStateContext";

export const GlobalApiLoader = () => {
  const { loading } = useApiState();

  return (
    <Backdrop 
      open={loading} 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Fade in={loading} timeout={500} unmountOnExit>
        <CircularProgress/>
      </Fade>
    </Backdrop>
  );
};
