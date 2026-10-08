using MusicStreaming.Core.DTOs.Auth;
using MusicStreaming.Core.Models;

namespace MusicStreaming.Core.Interfaces;

public interface IAuthRepository
{
    Task<LoginResponseDto?> LoginAsync(LoginRequestDto dto);

    Task<int> RegisterAsync(RegisterRequestDto dto);
}