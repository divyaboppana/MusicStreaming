import { useState, useEffect, FormEvent } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from '../../features/artists/artistSlice';
import { createSong } from '../../features/songs/songSlice';
import { showToast } from '../../features/ui/uiSlice';
import { artistApi } from '../../api/artistApi';
import { Album, GENRES } from '../../types';
import { FormCard } from '../AdminForm.styles';

export default function AddSong() {
  const dispatch = useAppDispatch();
  const artists = useAppSelector((s) => s.artists.list);

  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState<number | ''>('');
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumId, setAlbumId] = useState<number | ''>('');
  const [genreId, setGenreId] = useState<number | ''>('');
  const [durationSeconds, setDurationSeconds] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  // An album belongs to one artist, so albums are loaded per selected artist.
  useEffect(() => {
    setAlbumId('');
    setAlbums([]);
    if (!artistId) return;
    artistApi.getById(Number(artistId)).then((detail) => setAlbums(detail.albums));
  }, [artistId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artistId || !albumId || !genreId || !durationSeconds) return;
    setSubmitting(true);
    try {
      await dispatch(
        createSong({
          title: title.trim(),
          artistId: Number(artistId),
          albumId: Number(albumId),
          genreId: Number(genreId),
          durationSeconds: Number(durationSeconds),
        })
      ).unwrap();
      dispatch(showToast({ message: 'Song added' }));
      setTitle('');
      setDurationSeconds('');
      setGenreId('');
    } catch {
      dispatch(showToast({ message: 'Could not add song', severity: 'error' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Add Song
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Admin only. Adds a new song to an existing album.
      </Typography>

      <FormCard component="form" onSubmit={handleSubmit}>
        <TextField
          label="Song title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Artist"
          fullWidth
          required
          value={artistId}
          onChange={(e) => setArtistId(Number(e.target.value))}
          sx={{ mb: 2 }}
        >
          {artists.map((a) => (
            <MenuItem key={a.artistId} value={a.artistId}>
              {a.artistName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Album"
          fullWidth
          required
          disabled={!artistId}
          value={albumId}
          onChange={(e) => setAlbumId(Number(e.target.value))}
          helperText={!artistId ? 'Choose an artist first' : ' '}
          sx={{ mb: 2 }}
        >
          {albums.map((a) => (
            <MenuItem key={a.albumId} value={a.albumId}>
              {a.title}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Genre"
          fullWidth
          required
          value={genreId}
          onChange={(e) => setGenreId(Number(e.target.value))}
          sx={{ mb: 2 }}
        >
          {GENRES.map((g) => (
            <MenuItem key={g.genreId} value={g.genreId}>
              {g.genreName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Duration (seconds)"
          type="number"
          fullWidth
          required
          value={durationSeconds}
          onChange={(e) => setDurationSeconds(e.target.value)}
          helperText="e.g. 215 for 3:35"
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Song'}
        </Button>
      </FormCard>
    </Box>
  );
}
