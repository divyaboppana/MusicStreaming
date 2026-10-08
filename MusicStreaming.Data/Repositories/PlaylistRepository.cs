using Dapper;
using MusicStreaming.Core.DTOs.Playlist;
using MusicStreaming.Core.DTOs.Song;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Data.DbFactory;
using System.Data;

namespace MusicStreaming.Data.Repositories;

public class PlaylistRepository : IPlaylistRepository
{
    private readonly DapperContext _context;

    public PlaylistRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PlaylistDto>> GetAllAsync(int userId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.QueryAsync<PlaylistDto>(
                "SP_Playlists_Get",
                new { UserId = userId, PlaylistId = (int?)null },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error fetching playlists for UserId {userId}.",
                ex);
        }
    }

    public async Task<PlaylistDetailDto?> GetDetailAsync(int userId, int playlistId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            var rows = (await db.QueryAsync<PlaylistRow>(
                "SP_Playlists_Get",
                new { UserId = userId, PlaylistId = playlistId },
                commandType: CommandType.StoredProcedure)).ToList();

            if (rows.Count == 0)
                return null;

            var first = rows[0];

            return new PlaylistDetailDto
            {
                PlaylistId = first.PlaylistId,
                PlaylistName = first.PlaylistName,
                Songs = rows
                    .Where(r => r.SongId.HasValue)
                    .Select(r => new SongDto
                    {
                        SongId = r.SongId!.Value,
                        Title = r.Title ?? string.Empty,
                        ArtistName = r.ArtistName ?? string.Empty,
                        AlbumTitle = r.AlbumName ?? string.Empty
                    })
                    .ToList()
            };
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error fetching playlist details for PlaylistId {playlistId}.",
                ex);
        }
    }

    public async Task<int> UpsertAsync(
        int? playlistId,
        string playlistName,
        int userId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.ExecuteAsync(
                "SP_Playlist_Upsert",
                new
                {
                    PlaylistId = playlistId,
                    PlaylistName = playlistName,
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error saving playlist '{playlistName}'.",
                ex);
        }
    }

    public async Task AddSongAsync(
        int playlistId,
        int songId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            await db.ExecuteAsync(
                "SP_PlaylistSong_Manage",
                new
                {
                    Action = "ADD",
                    PlaylistId = playlistId,
                    SongId = songId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error adding SongId {songId} to PlaylistId {playlistId}.",
                ex);
        }
    }

    public async Task RemoveSongAsync(
        int playlistId,
        int songId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            await db.ExecuteAsync(
                "SP_PlaylistSong_Manage",
                new
                {
                    Action = "DELETE",
                    PlaylistId = playlistId,
                    SongId = songId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error removing SongId {songId} from PlaylistId {playlistId}.",
                ex);
        }
    }

    public async Task DeleteAsync(
        int playlistId,
        int userId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            await db.ExecuteAsync(
                "SP_Playlist_Delete",
                new
                {
                    PlaylistId = playlistId,
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error deleting PlaylistId {playlistId}.",
                ex);
        }
    }
}