import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchArtists } from '../features/artists/artistSlice';
import { fetchAlbums } from '../features/albums/albumSlice';
import ArtistCard from '../components/cards/ArtistCard';
import AlbumCard from '../components/cards/AlbumCard';
import { TileGrid } from '../components/cards/Card.styles';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';

export default function Home() {
  const dispatch = useAppDispatch();
  const { list: artists, status: artistStatus } = useAppSelector((s) => s.artists);
  const { list: albums, status: albumStatus } = useAppSelector((s) => s.albums);

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const loading = artistStatus === 'loading' && albumStatus === 'loading';

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Browse
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Explore artists and albums from the catalog.
      </Typography>

      {loading ? (
        <LoadingState label="Loading the catalog..." />
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Artists
          </Typography>
          {artists.length === 0 ? (
            <EmptyState title="No artists yet" description="Nothing in the catalog to show." />
          ) : (
            <TileGrid sx={{ mb: 5 }}>
              {artists.map((artist) => (
                <ArtistCard key={artist.artistId} artist={artist} />
              ))}
            </TileGrid>
          )}

          <Typography variant="h6" sx={{ mb: 2 }}>
            Albums
          </Typography>
          {albums.length === 0 ? (
            <EmptyState title="No albums yet" description="Nothing in the catalog to show." />
          ) : (
            <TileGrid>
              {albums.map((album) => (
                <AlbumCard key={album.albumId} album={album} />
              ))}
            </TileGrid>
          )}
        </>
      )}
    </Box>
  );
}
