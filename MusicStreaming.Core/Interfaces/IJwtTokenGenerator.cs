using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(
       int userId,
       string userName,
       string role);
    }
}
