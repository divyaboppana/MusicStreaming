import { styled } from '@mui/material/styles';
import { Box, ListItemButton } from '@mui/material';
import { tokens } from '../../styles/theme';

export const SidebarRoot = styled(Box)(() => ({
  width: 240,
  flexShrink: 0,
  height: '100vh',
  position: 'sticky',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: tokens.bg,
  borderRight: `1px solid ${tokens.border}`,
  padding: '20px 12px',
}));

export const LogoRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 12px 24px 12px',
}));

export const LogoMark = styled(Box)(() => ({
  width: 32,
  height: 32,
  borderRadius: 9,
  background: `linear-gradient(135deg, ${tokens.accent}, ${tokens.amber})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  color: '#0E0E12',
  fontSize: 16,
}));

export const NavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: number }>(({ active }) => ({
  borderRadius: 8,
  marginBottom: 2,
  color: active ? tokens.textPrimary : tokens.textSecondary,
  backgroundColor: active ? tokens.surfaceRaised : 'transparent',
  '&:hover': {
    backgroundColor: tokens.surfaceRaised,
    color: tokens.textPrimary,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 36,
    color: active ? tokens.accent : tokens.textSecondary,
  },
}));

export const SectionLabel = styled(Box)(() => ({
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: tokens.textSecondary,
  padding: '16px 12px 6px 12px',
}));

export const UserFooter = styled(Box)(() => ({
  marginTop: 'auto',
  padding: 12,
  borderTop: `1px solid ${tokens.border}`,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}));
