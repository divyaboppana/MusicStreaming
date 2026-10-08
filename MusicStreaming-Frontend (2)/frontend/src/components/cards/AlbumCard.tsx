import { Typography } from '@mui/material';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import { useNavigate } from 'react-router-dom';
import { Album } from '../../types';
import { resolveImageUrl } from '../../api/axiosClient';
import { TileRoot, TileImageWrap, TileImage } from './Card.styles';

export default function AlbumCard({ album }: { album: Album }) {
  const navigate = useNavigate();
  return (
    <TileRoot onClick={() => navigate(`/albums/${album.albumId}`)}>
      <TileImageWrap>
        {album.coverImageUrl ? (
          <TileImage src={resolveImageUrl(album.coverImageUrl)} alt={album.title} />
        ) : (
          <AlbumRoundedIcon sx={{ fontSize: 48, color: 'text.secondary', m: 'auto', display: 'block' }} />
        )}
      </TileImageWrap>
      <Typography variant="body1" fontWeight={600} noWrap>
        {album.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {album.releaseYear}
      </Typography>
    </TileRoot>
  );
}
