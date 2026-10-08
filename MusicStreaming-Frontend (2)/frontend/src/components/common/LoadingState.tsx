import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 10,
      }}
    >
      <CircularProgress size={28} sx={{ color: 'primary.main' }} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
