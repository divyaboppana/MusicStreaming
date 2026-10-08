import axiosClient from './axiosClient';
import { AuthUser, ApiMessage } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    axiosClient
      .post<AuthUser>('/auth/login', { email, password })
      .then((res) => res.data),

  register: (userName: string, email: string, password: string) =>
    axiosClient
      .post<ApiMessage>('/auth/register', { userName, email, password })
      .then((res) => res.data),
};
