using MusicStreaming.Core.DTOs.Album;
using System;
using System.Collections.Generic;
using System.Text;

namespace MusicStreaming.Core.DTOs.Artist
{
    public class ArtistDetailDto
    {
        public int ArtistId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public List<AlbumDto> Albums { get; set; } = new();
    }
}
