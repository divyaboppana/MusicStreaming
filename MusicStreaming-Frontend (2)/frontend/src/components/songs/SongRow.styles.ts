import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tokens } from '../../styles/theme';

export const RowRoot = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '32px 1fr auto auto',
  alignItems: 'center',
  gap: 16,
  padding: '10px 12px',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: tokens.surfaceRaised,
  },
}));

export const IndexCell = styled(Box)(() => ({
  color: tokens.textSecondary,
  fontSize: 14,
  textAlign: 'center',
}));

export const MetaCell = styled(Box)(() => ({
  minWidth: 0,
}));
