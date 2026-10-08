import axiosClient from './axiosClient';
import { Song, ApiMessage } from '../types';

export const songApi = {
  getAll: (params?: { genreId?: number; search?: string }) =>
    axiosClient.get<Song[]>('/songs', { params }).then((res) => res.data),

  create: (payload: {
    title: string;
    albumId: number;
    artistId: number;
    genreId: number;
    durationSeconds: number;
  }) =>
    axiosClient
      .post<ApiMessage>('/songs', payload)
      .then((res) => res.data),
};
