import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeAddToPlaylist, showToast } from '../../features/ui/uiSlice';
import { fetchPlaylists, addSongToPlaylist } from '../../features/playlists/playlistSlice';

export default function AddToPlaylistModal() {
  const dispatch = useAppDispatch();
  const songId = useAppSelector((s) => s.ui.addToPlaylistSongId);
  const playlists = useAppSelector((s) => s.playlists.list);
  const open = songId !== null;

  useEffect(() => {
    if (open) {
      dispatch(fetchPlaylists());
    }
  }, [open, dispatch]);

  const handlePick = async (playlistId: number, playlistName: string) => {
    if (!songId) return;
    try {
      await dispatch(addSongToPlaylist({ playlistId, songId })).unwrap();
      dispatch(showToast({ message: `Added to "${playlistName}"` }));
    } catch {
      dispatch(showToast({ message: 'Could not add song to playlist', severity: 'error' }));
    }
    dispatch(closeAddToPlaylist());
  };

  return (
    <Dialog open={open} onClose={() => dispatch(closeAddToPlaylist())} fullWidth maxWidth="xs">
      <DialogTitle>Add to playlist</DialogTitle>
      <DialogContent>
        {playlists.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <QueueMusicRoundedIcon sx={{ fontSize: 36, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              You don't have any playlists yet. Create one from the Playlists page first.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {playlists.map((p) => (
              <ListItemButton
                key={p.playlistId}
                onClick={() => handlePick(p.playlistId, p.playlistName)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText primary={p.playlistName} />
              </ListItemButton>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
