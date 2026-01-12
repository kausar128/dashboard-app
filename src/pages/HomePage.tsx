import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const HomePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome 👋
          </Typography>

          <Typography color="text.secondary">
            This is a dummy home page.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Use the top menu to navigate to the Dashboard and load users data.
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};
