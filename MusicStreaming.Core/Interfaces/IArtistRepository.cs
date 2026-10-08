using MusicStreaming.Core.DTOs.Artist;
using MusicStreaming.Core.Models;

namespace MusicStreaming.Core.Interfaces;

public interface IArtistRepository
{
    Task<IEnumerable<Artist>> GetAsync(int? artistId);

    Task<int> UpsertAsync(Artist artist);
    Task<ArtistDetail?> GetDetailAsync(int artistId);
}