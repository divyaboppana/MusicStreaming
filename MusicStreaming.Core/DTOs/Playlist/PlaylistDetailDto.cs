using MusicStreaming.Core.DTOs.Song;
using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Playlist
{
    public class PlaylistDetailDto
    {
        public int PlaylistId { get; set; }

        public string PlaylistName { get; set; } = string.Empty;

        public List<SongDto> Songs { get; set; } = new();
    }
}
