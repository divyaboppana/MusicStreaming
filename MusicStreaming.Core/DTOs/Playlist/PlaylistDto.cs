using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Playlist
{
    public class PlaylistDto
    {
        public int PlaylistId { get; set; }

        public string PlaylistName { get; set; } = string.Empty;

        //public DateTime CreatedDate { get; set; }
    }
}
