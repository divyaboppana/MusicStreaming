import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchArtistById, clearCurrentArtist } from '../features/artists/artistSlice';
import { resolveImageUrl } from '../api/axiosClient';
import AlbumCard from '../components/cards/AlbumCard';
import { TileGrid } from '../components/cards/Card.styles';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';

export default function ArtistDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: artist, status } = useAppSelector((s) => s.artists);

  useEffect(() => {
    if (id) dispatch(fetchArtistById(Number(id)));
    return () => {
      dispatch(clearCurrentArtist());
    };
  }, [id, dispatch]);

  if (status === 'loading' || !artist) {
    return <LoadingState label="Loading artist..." />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
        <Avatar
          src={resolveImageUrl(artist.imageUrl)}
          sx={{ width: 120, height: 120 }}
        />
        <Box>
          <Typography variant="overline" color="text.secondary">
            Artist
          </Typography>
          <Typography variant="h3">{artist.artistName}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {artist.albums.length} album{artist.albums.length === 1 ? '' : 's'}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Albums
      </Typography>
      {artist.albums.length === 0 ? (
        <EmptyState title="No albums yet" description="This artist has no albums in the catalog." />
      ) : (
        <TileGrid>
          {artist.albums.map((album) => (
            <AlbumCard key={album.albumId} album={album} />
          ))}
        </TileGrid>
      )}
    </Box>
  );
}
