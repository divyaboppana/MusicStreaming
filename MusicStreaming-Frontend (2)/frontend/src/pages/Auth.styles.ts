import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tokens } from '../styles/theme';

export const AuthScreen = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: tokens.bg,
  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(124,92,255,0.16), transparent 45%),
                     radial-gradient(circle at 80% 80%, rgba(255,180,84,0.10), transparent 45%)`,
  padding: 20,
}));

export const AuthCard = styled(Box)(() => ({
  width: '100%',
  maxWidth: 400,
  backgroundColor: tokens.surface,
  border: `1px solid ${tokens.border}`,
  borderRadius: 16,
  padding: '36px 32px',
}));

export const AuthLogo = styled(Box)(() => ({
  width: 44,
  height: 44,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${tokens.accent}, ${tokens.amber})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  color: '#0E0E12',
  fontSize: 20,
  marginBottom: 20,
}));
