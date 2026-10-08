using MusicStreaming.Core.DTOs.Album;
using MusicStreaming.Core.Models;

namespace MusicStreaming.Core.Interfaces;

public interface IAlbumRepository
{
    Task<IEnumerable<Album>> GetAsync(int? albumId);

    Task<AlbumDetailDto?> GetDetailAsync(int albumId);

    Task<int> UpsertAsync(Album album);
}