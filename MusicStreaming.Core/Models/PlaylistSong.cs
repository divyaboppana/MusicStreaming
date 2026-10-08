using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.Models
{
    public class PlaylistSong
    {
        public int PlaylistSongId { get; set; }

        public int PlaylistId { get; set; }

        public int SongId { get; set; }

        public DateTime AddedDate { get; set; }
    }
}
