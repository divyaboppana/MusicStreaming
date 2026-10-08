using Microsoft.AspNetCore.Mvc;
using MusicStreaming.Core.DTOs.Auth;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Utilities.Services;

namespace MusicStreaming.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _repository;
    private readonly IJwtTokenGenerator _jwt;

    public AuthController(
        IAuthRepository repository,
        IJwtTokenGenerator jwt)
    {
        _repository = repository;
        _jwt = jwt;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
    LoginRequestDto dto)
    {
        try
        {
            var user =
            await _repository.LoginAsync(dto);

            if (user == null)
            {
                return Unauthorized(
                    new
                    {
                        Message = "Invalid Credentials"
                    });
            }

            bool isValid = PasswordHasher.Verify(dto.Password,
                                                  user.PasswordHash);

            if (!isValid)
            {
                return Unauthorized(
                    new
                    {
                        Message = "Invalid Credentials"
                    });
            }

            user.Token = _jwt.GenerateToken(user.UserId,
                                             user.UserName,
                                             user.RoleName);

            user.PasswordHash = string.Empty;

            return Ok(user);
        }

        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequestDto dto)
    {
        try
        {
            await _repository.RegisterAsync(dto);

            return Ok(new
            {
                Message =
                "Registered Successfully"
            });
        }

        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }
}