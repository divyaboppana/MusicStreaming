import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import artistReducer from '../features/artists/artistSlice';
import albumReducer from '../features/albums/albumSlice';
import songReducer from '../features/songs/songSlice';
import playlistReducer from '../features/playlists/playlistSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    artists: artistReducer,
    albums: albumReducer,
    songs: songReducer,
    playlists: playlistReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
