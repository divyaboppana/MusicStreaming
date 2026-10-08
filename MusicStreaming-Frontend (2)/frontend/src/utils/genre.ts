import { GENRES } from '../types';

export function genreName(genreId: number): string {
  return GENRES.find((g) => g.genreId === genreId)?.genreName || 'Unknown';
}
