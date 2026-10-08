using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Song
{
    public class SongRow
    {
        public int SongId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int DurationSeconds { get; set; }
        public int GenreId { get; set; }
    }
}
