import { List, ListItemIcon, ListItemText, Typography, Avatar, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import {
  SidebarRoot,
  LogoRow,
  LogoMark,
  NavItem,
  SectionLabel,
  UserFooter,
} from './Sidebar.styles';

const navItems = [
  { label: 'Browse', path: '/', icon: <HomeRoundedIcon fontSize="small" /> },
  { label: 'Search', path: '/search', icon: <SearchRoundedIcon fontSize="small" /> },
  { label: 'Playlists', path: '/playlists', icon: <QueueMusicRoundedIcon fontSize="small" /> },
];

const adminItems = [
  { label: 'Add Artist', path: '/admin/add-artist', icon: <PersonAddRoundedIcon fontSize="small" /> },
  { label: 'Add Album', path: '/admin/add-album', icon: <AlbumRoundedIcon fontSize="small" /> },
  { label: 'Add Song', path: '/admin/add-song', icon: <LibraryMusicRoundedIcon fontSize="small" /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <SidebarRoot>
      <LogoRow>
        <LogoMark>W</LogoMark>
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Wavelength
        </Typography>
      </LogoRow>

      <List disablePadding>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </NavItem>
        ))}
      </List>

      {user?.roleName === 'Admin' && (
        <>
          <SectionLabel>Admin</SectionLabel>
          <List disablePadding>
            {adminItems.map((item) => (
              <NavItem
                key={item.path}
                active={location.pathname === item.path ? 1 : 0}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </NavItem>
            ))}
          </List>
        </>
      )}

      <UserFooter>
        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
          {user?.userName?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
            {user?.userName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.roleName}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={handleLogout}
          sx={{ minWidth: 'auto', p: 1, color: 'text.secondary' }}
        >
          <LogoutRoundedIcon fontSize="small" />
        </Button>
      </UserFooter>
    </SidebarRoot>
  );
}
