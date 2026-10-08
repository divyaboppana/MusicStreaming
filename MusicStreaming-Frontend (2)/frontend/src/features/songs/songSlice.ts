import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { songApi } from '../../api/songApi';
import { Song } from '../../types';

interface SongState {
  results: Song[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  hasSearched: boolean;
}

const initialState: SongState = {
  results: [],
  status: 'idle',
  error: null,
  hasSearched: false,
};

export const searchSongs = createAsyncThunk(
  'songs/search',
  async (params: { search?: string; genreId?: number }) => songApi.getAll(params)
);

export const createSong = createAsyncThunk(
  'songs/create',
  async (payload: {
    title: string;
    albumId: number;
    artistId: number;
    genreId: number;
    durationSeconds: number;
  }) => songApi.create(payload)
);

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    clearResults(state) {
      state.results = [];
      state.hasSearched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
        state.hasSearched = true;
      })
      .addCase(searchSongs.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Could not search songs';
      });
  },
});

export const { clearResults } = songSlice.actions;
export default songSlice.reducer;
