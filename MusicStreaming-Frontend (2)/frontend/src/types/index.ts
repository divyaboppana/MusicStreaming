// These mirror the C# DTOs 1:1 (System.Text.Json serializes to camelCase).

export type Role = 'Admin' | 'User';

export interface AuthUser {
  userId: number;
  userName: string;
  email: string;
  roleName: Role;
  token: string;
}

export interface Artist {
  artistId: number;
  artistName: string;
  imageUrl: string;
}

export interface ArtistDetail extends Artist {
  albums: Album[];
}

export interface Album {
  albumId: number;
  title: string;
  coverImageUrl: string;
  releaseYear: number;
}

export interface AlbumDetail extends Album {
  artistId: number;
  artistName: string;
  songs: Song[];
}

export interface Song {
  songId: number;
  title: string;
  durationSeconds: number;
  artistId: number;
  artistName: string;
  albumId: number;
  albumTitle: string;
  genreId: number;
  genreName: string;
}

export interface Playlist {
  playlistId: number;
  playlistName: string;
}

export interface PlaylistDetail extends Playlist {
  songs: Song[];
}

// The 5 fixed genres seeded into the Genres table - the API has no
// GET /api/genres endpoint, so this list is hardcoded to match the seed data.
export const GENRES: { genreId: number; genreName: string }[] = [
  { genreId: 1, genreName: 'Pop' },
  { genreId: 2, genreName: 'Rock' },
  { genreId: 3, genreName: 'HipHop' },
  { genreId: 4, genreName: 'Electronic' },
  { genreId: 5, genreName: 'Classical' },
];

export interface ApiMessage {
  message: string;
}
