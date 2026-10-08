using Dapper;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using MusicStreaming.Data.DbFactory;
using System.Data;

namespace MusicStreaming.Data.Repositories;

public class SongRepository : ISongRepository
{
    private readonly DapperContext _context;

    public SongRepository(
        DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Song>> GetAsync(
        int? songId,
        int? genreId,
        string? search)
    {
        try
        {
            using IDbConnection db =
                _context.CreateConnection();

            return await db.QueryAsync<Song>(
                "SP_Songs_Get",
                new
                {
                    SongId = songId,
                    GenreId = genreId,
                    Search = search
                },
                commandType:
                CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error fetching songs. SongId: {songId}, GenreId: {genreId}.",
                ex);
        }
    }

    public async Task<int> UpsertAsync(
        Song song)
    {
        try
        {
            using IDbConnection db =
                _context.CreateConnection();

            return await db.ExecuteAsync(
                "SP_Song_Upsert",
                new
                {
                    song.SongId,
                    song.Title,
                    song.AlbumId,
                    song.ArtistId,
                    song.DurationSeconds,
                    song.GenreId,
                    song.CreatedBy
                },
                commandType:
                CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error saving song '{song.Title}'.",
                ex);
        }
    }
}