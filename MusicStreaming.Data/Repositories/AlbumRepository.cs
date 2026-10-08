using Dapper;
using MusicStreaming.Core.DTOs.Album;
using MusicStreaming.Core.DTOs.Song;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using MusicStreaming.Data.DbFactory;
using System.Data;

namespace MusicStreaming.Data.Repositories;

public class AlbumRepository : IAlbumRepository
{
    private readonly DapperContext _context;

    public AlbumRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Album>> GetAsync(int? albumId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.QueryAsync<Album>(
                "SP_Albums_Get",
                new
                {
                    AlbumId = albumId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error fetching albums: {ex.Message}", ex);
        }
    }

    public async Task<AlbumDetailDto?> GetDetailAsync(int albumId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            using SqlMapper.GridReader result = await db.QueryMultipleAsync(
                "SP_Albums_Get",
                new { AlbumId = albumId },
                commandType: CommandType.StoredProcedure);

            var albumRow = await result.ReadFirstOrDefaultAsync<AlbumRow>();

            if (albumRow is null)
                return null;

            var songs = (await result.ReadAsync<SongRow>()).ToList();

            return new AlbumDetailDto
            {
                AlbumId = albumRow.AlbumId,
                Title = albumRow.Title,
                CoverImageUrl = albumRow.CoverImageUrl,
                ReleaseYear = albumRow.ReleaseYear,
                ArtistName = albumRow.ArtistName,
                Songs = songs.Select(s => new SongDto
                {
                    SongId = s.SongId,
                    Title = s.Title,
                    DurationSeconds = s.DurationSeconds,
                    ArtistName = albumRow.ArtistName
                }).ToList()
            };
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error fetching album details for AlbumId {albumId}: {ex.Message}",
                ex);
        }
    }

    public async Task<int> UpsertAsync(Album album)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.ExecuteAsync(
                "SP_Album_Upsert",
                new
                {
                    album.AlbumId,
                    album.Title,
                    album.ArtistId,
                    album.CoverImageUrl,
                    album.ReleaseYear,
                    album.CreatedBy
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error saving album '{album.Title}': {ex.Message}",
                ex);
        }
    }
}