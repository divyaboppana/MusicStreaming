import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tokens } from '../styles/theme';

export const FormCard = styled(Box)(() => ({
  maxWidth: 480,
  backgroundColor: tokens.surface,
  border: `1px solid ${tokens.border}`,
  borderRadius: 14,
  padding: 28,
}));

export const ImagePreview = styled(Box)(() => ({
  width: 96,
  height: 96,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: tokens.surfaceRaised,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  border: `1px dashed ${tokens.border}`,
}));
