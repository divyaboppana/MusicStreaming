import axios from 'axios';

// Change this to match your backend (see launchSettings.json / Swagger URL)
export const API_BASE_URL = "http://localhost:7062/api";

// Uploaded images (artist photos, album covers) are served as static files
// from the API's own origin, not under /api, e.g. "/Uploads/Artists/x.webp"
export const API_ORIGIN = API_BASE_URL.replace('/api', '');

export function resolveImageUrl(path?: string): string {
  if (!path) return '';
  return `${API_ORIGIN}${path}`;
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the JWT token (saved at login) to every request
axiosClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;