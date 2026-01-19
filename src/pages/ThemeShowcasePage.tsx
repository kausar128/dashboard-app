import React from 'react';
import { 
  Box, Button, Typography, Paper, Stack, TextField, 
  Grid, Card, CardContent, CardActions, Alert, AlertTitle,
  MenuItem, styled, useTheme 
} from '@mui/material';

// Custom Styled Component using our customBorders token
const StatusCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status?: 'success' | 'error' | 'warning' | 'info' }>(({ theme, status }) => ({
  // Uses our global card radius token
  borderRadius: theme.customBorders.radius.medium,
  // Dynamic border color based on the 'status' prop and our state palette
  borderTop: status 
    ? `${theme.customBorders.width.accent} solid ${theme.palette[status].main}`
    : `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const ThemeShowcasePage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Design System Components
      </Typography>

      <Grid container spacing={4}>
        
        {/* 1. STATE COLORS & ALERTS */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>State & Feedback</Typography>
          <Stack spacing={2}>
            <Alert severity="success" variant="filled">
              <AlertTitle>Success</AlertTitle>
              Your changes have been saved successfully using <strong>theme.palette.success</strong>.
            </Alert>
            <Alert severity="error">
              <AlertTitle>Connection Error</AlertTitle>
              API Request failed. This color matches your <strong>ApiStatusOverlay</strong> accent.
            </Alert>
            <Alert severity="info">
              <AlertTitle>Information</AlertTitle>
              This is an informational message styled with <strong>theme.palette.info</strong>.
            </Alert>
            <Alert severity="warning" variant="outlined">
              <AlertTitle>Warning</AlertTitle>
              Please check your input values. This uses the <strong>theme.palette.warning</strong> color.
            </Alert>
          </Stack>
        </Grid>

        {/* 2. INPUTS & FORM ELEMENTS */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Form Inputs</Typography>
            <Stack spacing={3}>
              <TextField 
                label="Full Name" 
                placeholder="John Doe" 
                fullWidth 
                // Automatically uses borderTokens.radius.small via theme overrides
              />
              <TextField 
                select 
                label="Region" 
                defaultValue="na" 
                fullWidth
              >
                <MenuItem value="na">North America</MenuItem>
                <MenuItem value="eu">Europe</MenuItem>
                <MenuItem value="apac">Asia Pacific</MenuItem>
              </TextField>
              <TextField 
                label="Password" 
                type="password" 
                error 
                helperText="Password must be at least 8 characters" 
                fullWidth 
              />
            </Stack>
          </Paper>
        </Grid>

        {/* 3. CARDS & ELEVATION */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Themed Cards</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StatusCard status="info">
                <CardContent>
                  <Typography variant="h6" color="info.main">Information</Typography>
                  <Typography variant="body2">
                    This card uses the <code>customBorders.width.accent</code> token for the top stripe.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </StatusCard>
            </Grid>
            <Grid item xs={12}>
              <StatusCard status="warning">
                <CardContent>
                  <Typography variant="h6" color="warning.main">Warning Alert</Typography>
                  <Typography variant="body2">
                    Notice how the border-radius remains consistent with the standard <code>Paper</code> component.
                  </Typography>
                </CardContent>
              </StatusCard>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
};