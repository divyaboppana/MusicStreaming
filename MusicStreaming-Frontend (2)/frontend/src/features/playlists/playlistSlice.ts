import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { playlistApi } from '../../api/playlistApi';
import { Playlist, PlaylistDetail } from '../../types';

interface PlaylistState {
  list: Playlist[];
  current: PlaylistDetail | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: PlaylistState = {
  list: [],
  current: null,
  status: 'idle',
  error: null,
};

export const fetchPlaylists = createAsyncThunk('playlists/fetchAll', async () =>
  playlistApi.getAll()
);

export const fetchPlaylistById = createAsyncThunk(
  'playlists/fetchById',
  async (id: number) => playlistApi.getById(id)
);

export const createPlaylist = createAsyncThunk(
  'playlists/create',
  async (playlistName: string) => playlistApi.create(playlistName)
);

export const renamePlaylist = createAsyncThunk(
  'playlists/rename',
  async (payload: { id: number; playlistName: string }) =>
    playlistApi.rename(payload.id, payload.playlistName)
);

export const deletePlaylist = createAsyncThunk(
  'playlists/delete',
  async (id: number) => playlistApi.remove(id)
);

export const addSongToPlaylist = createAsyncThunk(
  'playlists/addSong',
  async (payload: { playlistId: number; songId: number }) =>
    playlistApi.addSong(payload.playlistId, payload.songId)
);

export const removeSongFromPlaylist = createAsyncThunk(
  'playlists/removeSong',
  async (payload: { playlistId: number; songId: number }) =>
    playlistApi.removeSong(payload.playlistId, payload.songId)
);

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    clearCurrentPlaylist(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Could not load playlists';
      })
      .addCase(fetchPlaylistById.pending, (state) => {
        state.status = 'loading';
        state.current = null;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.current = action.payload;
      })
      .addCase(fetchPlaylistById.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Playlist not found';
      });
  },
});

export const { clearCurrentPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
