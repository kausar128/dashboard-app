import { Backdrop, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useApiState } from "../../state/api/ApiStateContext";

export const GlobalApiLoader = () => {
  const { loading } = useApiState();
  return (
    <Backdrop open={loading} sx={{ zIndex: 1300 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CircularProgress />
      </motion.div>
    </Backdrop>
  );
};
