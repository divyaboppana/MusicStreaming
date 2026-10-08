using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Song
{
    public class SongDto
    {
        public int SongId { get; set; }

        public string Title { get; set; } = string.Empty;

        public int DurationSeconds { get; set; }

        public int ArtistId { get; set; }

        public string ArtistName { get; set; } = string.Empty;

        public int AlbumId { get; set; }

        public string AlbumTitle { get; set; } = string.Empty;

        public int GenreId { get; set; }

        public string GenreName { get; set; } = string.Empty;
    }
}
