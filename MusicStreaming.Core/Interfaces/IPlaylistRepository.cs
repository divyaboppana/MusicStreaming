using MusicStreaming.Core.DTOs.Playlist;

namespace MusicStreaming.Core.Interfaces;

public interface IPlaylistRepository
{
    Task<IEnumerable<PlaylistDto>> GetAllAsync(int userId);

    Task<PlaylistDetailDto?> GetDetailAsync(int userId, int playlistId);

    Task<int> UpsertAsync(int? playlistId, string playlistName, int userId);

    Task AddSongAsync(int playlistId, int songId);

    Task RemoveSongAsync(int playlistId, int songId);

    Task DeleteAsync(int playlistId, int userId);
}