import { Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate } from 'react-router-dom';
import { Artist } from '../../types';
import { resolveImageUrl } from '../../api/axiosClient';
import { TileRoot, TileImageWrap, TileImage } from './Card.styles';

export default function ArtistCard({ artist }: { artist: Artist }) {
  const navigate = useNavigate();
  return (
    <TileRoot onClick={() => navigate(`/artists/${artist.artistId}`)}>
      <TileImageWrap round={1}>
        {artist.imageUrl ? (
          <TileImage src={resolveImageUrl(artist.imageUrl)} alt={artist.artistName} />
        ) : (
          <PersonRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', m: 'auto', display: 'block' }} />
        )}
      </TileImageWrap>
      <Typography variant="body1" fontWeight={600} noWrap>
        {artist.artistName}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Artist
      </Typography>
    </TileRoot>
  );
}
