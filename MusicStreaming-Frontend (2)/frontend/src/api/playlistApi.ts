import axiosClient from './axiosClient';
import { Playlist, PlaylistDetail, ApiMessage } from '../types';

export const playlistApi = {
  getAll: () =>
    axiosClient.get<Playlist[]>('/playlists').then((res) => res.data),

  getById: (id: number) =>
    axiosClient.get<PlaylistDetail>(`/playlists/${id}`).then((res) => res.data),

  create: (playlistName: string) =>
    axiosClient
      .post<ApiMessage>('/playlists', { playlistName })
      .then((res) => res.data),

  rename: (id: number, playlistName: string) =>
    axiosClient
      .put<ApiMessage>(`/playlists/${id}`, { playlistName })
      .then((res) => res.data),

  remove: (id: number) =>
    axiosClient.delete<ApiMessage>(`/playlists/${id}`).then((res) => res.data),

  addSong: (playlistId: number, songId: number) =>
    axiosClient
      .post<ApiMessage>(`/playlists/${playlistId}/songs`, { songId })
      .then((res) => res.data),

  removeSong: (playlistId: number, songId: number) =>
    axiosClient
      .delete<ApiMessage>(`/playlists/${playlistId}/songs/${songId}`)
      .then((res) => res.data),
};
