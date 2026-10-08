
using System.ComponentModel.DataAnnotations;

namespace MusicStreaming.Core.DTOs.Playlist;
public class PlaylistCreateDto
{
    [Required]
    public string PlaylistName { get; set; }
        = string.Empty;
}