import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Skeleton,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import apiClient from "../../api/apiClient";
import { Notification } from "../../api/notifications.mock";
import { NotificationItem } from "./NotificationItem";

export const ActionRequiredCard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Intercepted by your notificationsMock
    apiClient
      .get("/api/notifications")
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications", err);
        setLoading(false);
      });
  }, []);

  const visibleItems = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Paper
      elevation={0}
      sx={{
        width: 360,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: (theme) => theme.customBorders.radius.large,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <WarningIcon />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Action Required
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {loading
            ? "Calculating..."
            : `${notifications.length} items remaining`}
        </Typography>
      </Box>

      <Divider />

      {/* Scrollable List Container */}
      <Box
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
          },
        }}
      >
        {loading
          ? // Skeleton loader for the 10s delay
            [...Array(3)].map((_, i) => (
              <Box key={i} sx={{ p: 3 }}>
                <Skeleton variant="rectangular" height={100} />
              </Box>
            ))
          : visibleItems.map((item) => (
              <NotificationItem key={item.id} data={item} />
            ))}
      </Box>

      <Divider />

      {/* Footer Toggle */}
      {!loading && (
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            onClick={() => setShowAll(!showAll)}
            sx={{
              textTransform: "none",
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            {showAll ? "Show less" : "View all notifications"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};
