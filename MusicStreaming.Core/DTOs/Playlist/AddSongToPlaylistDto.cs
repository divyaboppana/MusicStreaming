using System.ComponentModel.DataAnnotations;

public class AddSongToPlaylistDto
{
    [Required]
    public int SongId { get; set; }
}