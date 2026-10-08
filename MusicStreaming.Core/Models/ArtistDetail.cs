namespace MusicStreaming.Core.Models;

public class ArtistDetail
{
    public int ArtistId { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<Album> Albums { get; set; } = new();
}