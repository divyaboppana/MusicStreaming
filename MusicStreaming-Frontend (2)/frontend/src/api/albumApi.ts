import axiosClient from './axiosClient';
import { Album, AlbumDetail, ApiMessage } from '../types';

export const albumApi = {
  getAll: () => axiosClient.get<Album[]>('/albums').then((res) => res.data),

  getById: (id: number) =>
    axiosClient.get<AlbumDetail>(`/albums/${id}`).then((res) => res.data),

  create: (title: string, artistId: number, releaseYear: number, coverImage: File) => {
    const form = new FormData();
    form.append('Title', title);
    form.append('ArtistId', String(artistId));
    form.append('ReleaseYear', String(releaseYear));
    form.append('CoverImage', coverImage);
    return axiosClient
      .post<ApiMessage>('/albums', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
};
