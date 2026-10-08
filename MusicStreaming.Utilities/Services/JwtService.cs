using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MusicStreaming.Core.Interfaces;

namespace MusicStreaming.Utilities.Services
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IConfiguration _configuration;

        public JwtTokenGenerator(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(
            int userId,
            string userName,
            string role)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier,
                userId.ToString()),

            new Claim(ClaimTypes.Name,
                userName),

            new Claim(ClaimTypes.Role,
                role)
        };

            var key =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!));

            var credentials =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256);

            var token =
                new JwtSecurityToken(
                    claims: claims,
                    expires:
                    DateTime.UtcNow.AddHours(1),
                    signingCredentials:
                    credentials);

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}
