import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPlaylistById,
  clearCurrentPlaylist,
  renamePlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
} from '../features/playlists/playlistSlice';
import { showToast } from '../features/ui/uiSlice';
import SongRow from '../components/songs/SongRow';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';

export default function PlaylistDetail() {
  const { id } = useParams();
  const playlistId = Number(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current: playlist, status } = useAppSelector((s) => s.playlists);

  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId));
    return () => {
      dispatch(clearCurrentPlaylist());
    };
  }, [playlistId, dispatch]);

  const startEditing = () => {
    setNameDraft(playlist?.playlistName || '');
    setEditing(true);
  };

  const saveRename = async () => {
    if (!nameDraft.trim()) return;
    try {
      await dispatch(renamePlaylist({ id: playlistId, playlistName: nameDraft.trim() })).unwrap();
      dispatch(fetchPlaylistById(playlistId));
      dispatch(showToast({ message: 'Playlist renamed' }));
    } catch {
      dispatch(showToast({ message: 'Could not rename playlist', severity: 'error' }));
    }
    setEditing(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePlaylist(playlistId)).unwrap();
      dispatch(showToast({ message: 'Playlist deleted' }));
      navigate('/playlists');
    } catch {
      dispatch(showToast({ message: 'Could not delete playlist', severity: 'error' }));
    }
  };

  const handleRemoveSong = async (songId: number) => {
    try {
      await dispatch(removeSongFromPlaylist({ playlistId, songId })).unwrap();
      dispatch(fetchPlaylistById(playlistId));
      dispatch(showToast({ message: 'Song removed' }));
    } catch {
      dispatch(showToast({ message: 'Could not remove song', severity: 'error' }));
    }
  };

  if (status === 'loading' || !playlist) {
    return <LoadingState label="Loading playlist..." />;
  }

  return (
    <Box sx={{ maxWidth: 720 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        {editing ? (
          <>
            <TextField
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              size="small"
              autoFocus
              sx={{ flex: 1 }}
            />
            <IconButton onClick={saveRename} sx={{ color: 'success.main' }}>
              <CheckRoundedIcon />
            </IconButton>
            <IconButton onClick={() => setEditing(false)} sx={{ color: 'text.secondary' }}>
              <CloseRoundedIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ flex: 1 }}>
              {playlist.playlistName}
            </Typography>
            <IconButton onClick={startEditing} sx={{ color: 'text.secondary' }}>
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={() => setConfirmDelete(true)} sx={{ color: 'error.main' }}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </>
        )}
      </Box>

      {playlist.songs.length === 0 ? (
        <EmptyState
          title="This playlist is empty"
          description='Add songs from an album or the Search page using "Add to playlist".'
        />
      ) : (
        <Box>
          {playlist.songs.map((song, i) => (
            <SongRow
              key={song.songId}
              song={song}
              index={i + 1}
              showAlbum
              onRemove={() => handleRemoveSong(song.songId)}
            />
          ))}
        </Box>
      )}

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Delete "{playlist.playlistName}"?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This can't be undone. The playlist and its song list will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
