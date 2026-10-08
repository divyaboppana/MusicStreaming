import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        404
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This page doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to Browse
      </Button>
    </Box>
  );
}
