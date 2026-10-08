using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MusicStreaming.Core.DTOs.Artist;

public class ArtistCreateDto
{
    [Required]
    public string ArtistName { get; set; } = string.Empty;

    [Required]
    public IFormFile Image { get; set; } = null!;
}