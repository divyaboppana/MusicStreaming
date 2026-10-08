import axiosClient from './axiosClient';
import { Artist, ArtistDetail, ApiMessage } from '../types';

export const artistApi = {
  getAll: () => axiosClient.get<Artist[]>('/artists').then((res) => res.data),

  getById: (id: number) =>
    axiosClient.get<ArtistDetail>(`/artists/${id}`).then((res) => res.data),

  create: (artistName: string, image: File) => {
    const form = new FormData();
    form.append('ArtistName', artistName);
    form.append('Image', image);
    return axiosClient
      .post<ApiMessage>('/artists', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
};
