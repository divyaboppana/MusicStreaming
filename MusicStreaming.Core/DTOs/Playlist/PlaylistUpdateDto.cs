using System.ComponentModel.DataAnnotations;

namespace MusicStreaming.Core.DTOs.Playlist;

public class PlaylistUpdateDto
{
    [Required]
    public string PlaylistName { get; set; }
        = string.Empty;
}