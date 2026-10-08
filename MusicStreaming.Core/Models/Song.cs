namespace MusicStreaming.Core.Models;

public class Song
{
    public int SongId { get; set; }

    public string Title { get; set; } = string.Empty;

    public int AlbumId { get; set; }

    public int ArtistId { get; set; }

    public int DurationSeconds { get; set; }

    public int GenreId { get; set; }

    public int CreatedBy { get; set; }

}