import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { albumApi } from '../../api/albumApi';
import { Album, AlbumDetail } from '../../types';

interface AlbumState {
  list: Album[];
  current: AlbumDetail | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AlbumState = {
  list: [],
  current: null,
  status: 'idle',
  error: null,
};

export const fetchAlbums = createAsyncThunk('albums/fetchAll', async () =>
  albumApi.getAll()
);

export const fetchAlbumById = createAsyncThunk(
  'albums/fetchById',
  async (id: number) => albumApi.getById(id)
);

export const createAlbum = createAsyncThunk(
  'albums/create',
  async (payload: {
    title: string;
    artistId: number;
    releaseYear: number;
    coverImage: File;
  }) =>
    albumApi.create(payload.title, payload.artistId, payload.releaseYear, payload.coverImage)
);

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    clearCurrentAlbum(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Could not load albums';
      })
      .addCase(fetchAlbumById.pending, (state) => {
        state.status = 'loading';
        state.current = null;
        state.error = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.current = action.payload;
      })
      .addCase(fetchAlbumById.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Album not found';
      });
  },
});

export const { clearCurrentAlbum } = albumSlice.actions;
export default albumSlice.reducer;
