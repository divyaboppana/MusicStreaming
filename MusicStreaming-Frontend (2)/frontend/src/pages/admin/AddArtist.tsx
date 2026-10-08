import { useState, FormEvent } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useAppDispatch } from '../../app/hooks';
import { createArtist } from '../../features/artists/artistSlice';
import { showToast } from '../../features/ui/uiSlice';
import { FormCard, ImagePreview } from '../AdminForm.styles';

export default function AddArtist() {
  const dispatch = useAppDispatch();
  const [artistName, setArtistName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (file: File | null) => {
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!artistName.trim() || !image) return;
    setSubmitting(true);
    try {
      await dispatch(createArtist({ artistName: artistName.trim(), image })).unwrap();
      dispatch(showToast({ message: 'Artist added' }));
      setArtistName('');
      handleFile(null);
    } catch {
      dispatch(showToast({ message: 'Could not add artist', severity: 'error' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Add Artist
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Admin only. Adds a new artist to the catalog.
      </Typography>

      <FormCard component="form" onSubmit={handleSubmit}>
        <ImagePreview component="label">
          {preview ? (
            <Box component="img" src={preview} alt="preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <PersonRoundedIcon sx={{ color: 'text.secondary' }} />
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
          label="Artist name"
          fullWidth
          required
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" disabled={submitting || !image}>
          {submitting ? 'Adding...' : 'Add Artist'}
        </Button>
      </FormCard>
    </Box>
  );
}
