using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Album
{
    public class AlbumRow
    {
        public int AlbumId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int ReleaseYear { get; set; }
        public string CoverImageUrl { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
    }
}
