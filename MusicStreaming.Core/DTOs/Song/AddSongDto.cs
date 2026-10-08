using System.ComponentModel.DataAnnotations;

namespace MusicStreaming.Core.DTOs.Song;

public class AddSongDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public int AlbumId { get; set; }

    [Required]
    public int ArtistId { get; set; }

    [Required]
    public int GenreId { get; set; }

    [Range(1, 10000)]
    public int DurationSeconds { get; set; }
}