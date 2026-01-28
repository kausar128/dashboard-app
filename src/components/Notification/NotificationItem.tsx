import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Notification } from '../../api/notifications.mock';

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'error': return <ErrorOutlineIcon color="error" />;
    case 'info': return <InfoOutlinedIcon color="info" />;
    default: return <WarningAmberIcon color="warning" />;
  }
};

export const NotificationItem = ({ data }: { data: Notification }) => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 2, px: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{ mt: 0.5 }}>{getIcon(data.type)}</Box>
        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
            {data.title}
          </Typography>
          
          {data.description.map((line, i) => (
            <Typography key={i} variant="body2" color="text.secondary">
              {line}
            </Typography>
          ))}

          <Button
            variant="contained"
            size="small"
            sx={{
              width: 'fit-content',
              textTransform: 'none',
              mt: 1,
              borderRadius: theme.customComponents.button.borderRadius,
            }}
          >
            {data.buttonText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};