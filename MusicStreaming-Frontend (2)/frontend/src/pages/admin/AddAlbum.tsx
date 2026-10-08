import { useState, useEffect, FormEvent } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from '../../features/artists/artistSlice';
import { createAlbum } from '../../features/albums/albumSlice';
import { showToast } from '../../features/ui/uiSlice';
import { FormCard, ImagePreview } from '../AdminForm.styles';

export default function AddAlbum() {
  const dispatch = useAppDispatch();
  const artists = useAppSelector((s) => s.artists.list);

  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState<number | ''>('');
  const [releaseYear, setReleaseYear] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleFile = (file: File | null) => {
    setCoverImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artistId || !releaseYear || !coverImage) return;
    setSubmitting(true);
    try {
      await dispatch(
        createAlbum({
          title: title.trim(),
          artistId: Number(artistId),
          releaseYear: Number(releaseYear),
          coverImage,
        })
      ).unwrap();
      dispatch(showToast({ message: 'Album added' }));
      setTitle('');
      setArtistId('');
      setReleaseYear('');
      handleFile(null);
    } catch {
      dispatch(showToast({ message: 'Could not add album', severity: 'error' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Add Album
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Admin only. Adds a new album under an existing artist.
      </Typography>

      <FormCard component="form" onSubmit={handleSubmit}>
        <ImagePreview component="label">
          {preview ? (
            <Box component="img" src={preview} alt="preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <AlbumRoundedIcon sx={{ color: 'text.secondary' }} />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            required
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </ImagePreview>

        <TextField
          label="Album title"
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
          label="Release year"
          type="number"
          fullWidth
          required
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" disabled={submitting || !coverImage}>
          {submitting ? 'Adding...' : 'Add Album'}
        </Button>
      </FormCard>
    </Box>
  );
}
