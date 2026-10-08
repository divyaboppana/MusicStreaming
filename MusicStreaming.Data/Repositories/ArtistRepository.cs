using Dapper;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using MusicStreaming.Data.DbFactory;
using System.Data;

namespace MusicStreaming.Data.Repositories;

public class ArtistRepository : IArtistRepository
{
    private readonly DapperContext _context;

    public ArtistRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Artist>> GetAsync(int? artistId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.QueryAsync<Artist>(
                "SP_Artists_Get",
                new
                {
                    ArtistId = artistId
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error fetching artists: {ex.Message}", ex);
        }
    }

    public async Task<int> UpsertAsync(Artist artist)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            return await db.ExecuteAsync(
                "SP_Artist_Upsert",
                new
                {
                    artist.ArtistId,
                    artist.ArtistName,
                    artist.ImageUrl,
                    artist.CreatedBy
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error saving artist '{artist.ArtistName}': {ex.Message}",
                ex);
        }
    }

    public async Task<ArtistDetail?> GetDetailAsync(int artistId)
    {
        try
        {
            using IDbConnection db = _context.CreateConnection();

            using SqlMapper.GridReader result = await db.QueryMultipleAsync(
                "SP_Artists_Get",
                new { ArtistId = artistId },
                commandType: CommandType.StoredProcedure);

            Artist? artist = await result.ReadFirstOrDefaultAsync<Artist>();

            if (artist is null)
                return null;

            List<Album> albums = (await result.ReadAsync<Album>()).ToList();

            return new ArtistDetail
            {
                ArtistId = artist.ArtistId,
                ArtistName = artist.ArtistName,
                ImageUrl = artist.ImageUrl,
                Albums = albums
            };
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error fetching artist details for ArtistId {artistId}: {ex.Message}",
                ex);
        }
    }
}