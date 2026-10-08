import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info';
}

interface UiState {
  toast: ToastState;
  // songId currently targeted by the "Add to Playlist" modal, null = closed
  addToPlaylistSongId: number | null;
}

const initialState: UiState = {
  toast: { open: false, message: '', severity: 'success' },
  addToPlaylistSongId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{ message: string; severity?: ToastState['severity'] }>
    ) {
      state.toast = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'success',
      };
    },
    hideToast(state) {
      state.toast.open = false;
    },
    openAddToPlaylist(state, action: PayloadAction<number>) {
      state.addToPlaylistSongId = action.payload;
    },
    closeAddToPlaylist(state) {
      state.addToPlaylistSongId = null;
    },
  },
});

export const { showToast, hideToast, openAddToPlaylist, closeAddToPlaylist } =
  uiSlice.actions;
export default uiSlice.reducer;
