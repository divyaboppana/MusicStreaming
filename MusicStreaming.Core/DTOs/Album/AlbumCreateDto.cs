using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MusicStreaming.Core.DTOs.Album;

public class AlbumCreateDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public int ArtistId { get; set; }

    [Required]
    public int ReleaseYear { get; set; }

    [Required]
    public IFormFile CoverImage { get; set; } = null!;
}