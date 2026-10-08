import { useEffect, useState, FormEvent } from 'react';
import { Box, Typography, TextField, Button, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPlaylists, createPlaylist } from '../features/playlists/playlistSlice';
import { showToast } from '../features/ui/uiSlice';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import { tokens } from '../styles/theme';

export default function Playlists() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, status } = useAppSelector((s) => s.playlists);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    try {
      await dispatch(createPlaylist(name.trim())).unwrap();
      setName('');
      dispatch(showToast({ message: 'Playlist created' }));
      dispatch(fetchPlaylists());
    } catch {
      dispatch(showToast({ message: 'Could not create playlist', severity: 'error' }));
    } finally {
      setCreating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 640 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Playlists
      </Typography>

      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{ display: 'flex', gap: 1.5, mb: 4 }}
      >
        <TextField
          fullWidth
          placeholder="New playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          disabled={creating || !name.trim()}
          sx={{ flexShrink: 0 }}
        >
          Create
        </Button>
      </Box>

      {status === 'loading' ? (
        <LoadingState label="Loading playlists..." />
      ) : list.length === 0 ? (
        <EmptyState
          title="No playlists yet"
          description="Create your first playlist above to start adding songs."
          icon={<QueueMusicRoundedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />}
        />
      ) : (
        <List disablePadding sx={{ backgroundColor: tokens.surface, borderRadius: 2, overflow: 'hidden' }}>
          {list.map((p) => (
            <ListItemButton key={p.playlistId} onClick={() => navigate(`/playlists/${p.playlistId}`)}>
              <ListItemIcon>
                <QueueMusicRoundedIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary={p.playlistName} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
