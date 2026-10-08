using Dapper;
using MusicStreaming.Core.DTOs.Auth;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Data.DbFactory;
using MusicStreaming.Utilities.Services;
using System.Data;

namespace MusicStreaming.Data.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly DapperContext _context;

    public AuthRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<LoginResponseDto?> LoginAsync(
        LoginRequestDto dto)
    {
        try
        {
            using IDbConnection db =
                _context.CreateConnection();

            return await db.QueryFirstOrDefaultAsync<LoginResponseDto>(
                "SP_Auth",
                new
                {
                    Action = "LOGIN",
                    Email = dto.Email
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error occurred while logging in user '{dto.Email}'.",
                ex);
        }
    }

    public async Task<int> RegisterAsync(
        RegisterRequestDto dto)
    {
        try
        {
            using IDbConnection db =
                _context.CreateConnection();

            var hashedPassword =
                PasswordHasher.Hash(dto.Password);

            return await db.ExecuteAsync(
                "SP_Auth",
                new
                {
                    Action = "REGISTER",
                    dto.UserName,
                    dto.Email,
                    PasswordHash = hashedPassword,
                    // dto.RoleName
                },
                commandType: CommandType.StoredProcedure);
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error occurred while registering user '{dto.Email}'.",
                ex);
        }
    }
}