using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Album
{
    public class AlbumDto
    {
        public int AlbumId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string CoverImageUrl { get; set; } = string.Empty;

        public int ReleaseYear { get; set; }
    }
}
