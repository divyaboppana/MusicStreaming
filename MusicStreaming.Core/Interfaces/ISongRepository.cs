using MusicStreaming.Core.DTOs.Song;
using MusicStreaming.Core.Models;

namespace MusicStreaming.Core.Interfaces;

public interface ISongRepository
{
    Task<IEnumerable<Song>> GetAsync(
        int? songId,
        int? genreId,
        string? search);
    Task<int> UpsertAsync(
       Song song);
}