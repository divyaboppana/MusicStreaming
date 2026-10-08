import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Toast from '../common/Toast';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { tokens } from '../../styles/theme';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: tokens.bg }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          padding: { xs: '20px', md: '32px 40px' },
        }}
      >
        <Outlet />
      </Box>
      <Toast />
      <AddToPlaylistModal />
    </Box>
  );
}
