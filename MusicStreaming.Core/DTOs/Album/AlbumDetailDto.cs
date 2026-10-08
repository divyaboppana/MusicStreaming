using MusicStreaming.Core.DTOs.Song;
using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Album
{
    public class AlbumDetailDto
    {
        public int AlbumId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string CoverImageUrl { get; set; } = string.Empty;

        public int ReleaseYear { get; set; }

        public int ArtistId { get; set; }

        public string ArtistName { get; set; } = string.Empty;

        public List<SongDto> Songs { get; set; } = new();
    }
}
