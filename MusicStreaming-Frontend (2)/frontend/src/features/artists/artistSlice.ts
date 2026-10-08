import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { artistApi } from '../../api/artistApi';
import { Artist, ArtistDetail } from '../../types';

interface ArtistState {
  list: Artist[];
  current: ArtistDetail | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ArtistState = {
  list: [],
  current: null,
  status: 'idle',
  error: null,
};

export const fetchArtists = createAsyncThunk('artists/fetchAll', async () =>
  artistApi.getAll()
);

export const fetchArtistById = createAsyncThunk(
  'artists/fetchById',
  async (id: number) => artistApi.getById(id)
);

export const createArtist = createAsyncThunk(
  'artists/create',
  async (payload: { artistName: string; image: File }) =>
    artistApi.create(payload.artistName, payload.image)
);

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    clearCurrentArtist(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Could not load artists';
      })
      .addCase(fetchArtistById.pending, (state) => {
        state.status = 'loading';
        state.current = null;
        state.error = null;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.current = action.payload;
      })
      .addCase(fetchArtistById.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Artist not found';
      });
  },
});

export const { clearCurrentArtist } = artistSlice.actions;
export default artistSlice.reducer;
