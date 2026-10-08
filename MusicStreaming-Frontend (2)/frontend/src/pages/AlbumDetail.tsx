import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchAlbumById, clearCurrentAlbum } from '../features/albums/albumSlice';
import { openAddToPlaylist } from '../features/ui/uiSlice';
import { resolveImageUrl } from '../api/axiosClient';
import SongRow from '../components/songs/SongRow';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import { tokens } from '../styles/theme';

export default function AlbumDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: album, status } = useAppSelector((s) => s.albums);
  const isLoggedIn = !!useAppSelector((s) => s.auth.user);

  useEffect(() => {
    if (id) dispatch(fetchAlbumById(Number(id)));
    return () => {
      dispatch(clearCurrentAlbum());
    };
  }, [id, dispatch]);

  if (status === 'loading' || !album) {
    return <LoadingState label="Loading album..." />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3, mb: 5 }}>
        <Box
          component="img"
          src={resolveImageUrl(album.coverImageUrl)}
          alt={album.title}
          sx={{
            width: 160,
            height: 160,
            borderRadius: 2,
            objectFit: 'cover',
            backgroundColor: tokens.surfaceRaised,
          }}
        />
        <Box>
          <Typography variant="overline" color="text.secondary">
            Album
          </Typography>
          <Typography variant="h3">{album.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            <MuiLink component={RouterLink} to={`/artists/${album.artistId}`} underline="hover" color="inherit">
              {album.artistName}
            </MuiLink>
            {' \u00b7 '}
            {album.releaseYear} {'\u00b7'} {album.songs.length} track{album.songs.length === 1 ? '' : 's'}
          </Typography>
        </Box>
      </Box>

      {album.songs.length === 0 ? (
        <EmptyState title="No tracks yet" description="This album has no songs in the catalog." />
      ) : (
        <Box>
          {album.songs.map((song, i) => (
            <SongRow
              key={song.songId}
              song={song}
              index={i + 1}
              onAdd={isLoggedIn ? () => dispatch(openAddToPlaylist(song.songId)) : undefined}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
