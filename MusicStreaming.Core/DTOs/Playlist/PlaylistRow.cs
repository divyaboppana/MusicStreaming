using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Playlist
{
    public class PlaylistRow
    {
        public int PlaylistId { get; set; }
        public string PlaylistName { get; set; } = string.Empty;
        public int? SongId { get; set; }
        public string? Title { get; set; }
        public string? ArtistName { get; set; }
        public string? AlbumName { get; set; }
    }
}
