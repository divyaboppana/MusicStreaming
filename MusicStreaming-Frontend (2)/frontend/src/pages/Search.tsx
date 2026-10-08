import { useState, FormEvent, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Chip, Stack } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchSongs } from '../features/songs/songSlice';
import { openAddToPlaylist } from '../features/ui/uiSlice';
import { GENRES } from '../types';
import SongRow from '../components/songs/SongRow';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';

export default function Search() {
  const dispatch = useAppDispatch();
  const { results, status, hasSearched } = useAppSelector((s) => s.songs);
  const isLoggedIn = !!useAppSelector((s) => s.auth.user);

  const [query, setQuery] = useState('');
  const [genreId, setGenreId] = useState<number | null>(null);

  const runSearch = (search: string, genre: number | null) => {
    dispatch(searchSongs({ search: search || undefined, genreId: genre || undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runSearch(query, genreId);
  };

  const toggleGenre = (id: number) => {
    const next = genreId === id ? null : id;
    setGenreId(next);
    runSearch(query, next);
  };

  // Show everything by default so the page isn't empty on first load.
  useEffect(() => {
    runSearch('', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search songs by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        {GENRES.map((g) => (
          <Chip
            key={g.genreId}
            label={g.genreName}
            clickable
            color={genreId === g.genreId ? 'primary' : 'default'}
            onClick={() => toggleGenre(g.genreId)}
          />
        ))}
      </Stack>

      {status === 'loading' ? (
        <LoadingState label="Searching..." />
      ) : results.length === 0 && hasSearched ? (
        <EmptyState title="No songs found" description="Try a different title or clear the genre filter." />
      ) : (
        <Box>
          {results.map((song) => (
            <SongRow
              key={song.songId}
              song={song}
              showAlbum
              onAdd={isLoggedIn ? () => dispatch(openAddToPlaylist(song.songId)) : undefined}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
