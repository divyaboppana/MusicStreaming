import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ArtistDetail from './pages/ArtistDetail';
import AlbumDetail from './pages/AlbumDetail';
import Search from './pages/Search';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import AddArtist from './pages/admin/AddArtist';
import AddAlbum from './pages/admin/AddAlbum';
import AddSong from './pages/admin/AddSong';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything below requires login - the app has no public/guest browsing */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin/add-artist" element={<AddArtist />} />
            <Route path="/admin/add-album" element={<AddAlbum />} />
            <Route path="/admin/add-song" element={<AddSong />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
