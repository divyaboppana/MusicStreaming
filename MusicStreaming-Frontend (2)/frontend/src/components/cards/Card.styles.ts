import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { tokens } from '../../styles/theme';

export const TileRoot = styled(Box)(() => ({
  backgroundColor: tokens.surface,
  borderRadius: 12,
  padding: 14,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, transform 150ms ease',
  '&:hover': {
    backgroundColor: tokens.surfaceRaised,
    transform: 'translateY(-2px)',
  },
}));

export const TileImageWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'round',
})<{ round?: number }>(({ round }) => ({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: round ? 999 : 8,
  overflow: 'hidden',
  backgroundColor: tokens.surfaceRaised,
  marginBottom: 12,
}));

export const TileImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

export const TileGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
  gap: 18,
}));
