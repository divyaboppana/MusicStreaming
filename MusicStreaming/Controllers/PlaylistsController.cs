using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicStreaming.Core.DTOs.Playlist;
using MusicStreaming.Core.Interfaces;
using System.Security.Claims;

namespace MusicStreaming.API.Controllers;

[Authorize]
[ApiController]
[Route("api/playlists")]
public class PlaylistController : ControllerBase
{
    private readonly IPlaylistRepository _repository;

    public PlaylistController(
        IPlaylistRepository repository)
    {
        _repository = repository;
    }

    private int UserId => Convert.ToInt32(User.FindFirstValue(
                                            ClaimTypes.NameIdentifier));

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await _repository.GetAllAsync(UserId));

        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var result = await _repository.GetDetailAsync(UserId, id);

            if (result is null)
            {
                return NotFound(new { Message = "Playlist Not Found" });
            }

            return Ok(result);
        }

         catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        PlaylistCreateDto dto)
    {
        try
        {
            await _repository.UpsertAsync(
            null,
            dto.PlaylistName,
            UserId);

            return Ok(new
            {
                Message = "Playlist Created"
            });
        }

         catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        PlaylistUpdateDto dto)
    {
        try
        {
            await _repository.UpsertAsync(
            id,
            dto.PlaylistName,
            UserId);

            return Ok(new
            {
                Message = "Playlist Updated"
            });
        }
         catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        int id)
    {
        try
        {
            await _repository.DeleteAsync(
            id,
            UserId);

            return Ok(new
            {
                Message = "Playlist Deleted"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }


    }

    [HttpPost("{playlistId}/songs")]
    public async Task<IActionResult> AddSong(
    int playlistId,
    AddSongToPlaylistDto dto)
    {
        try
        {
            await _repository.AddSongAsync(
                playlistId,
                dto.SongId);

            return Ok(new
            {
                Message = "Song Added"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [HttpDelete("{playlistId}/songs/{songId}")]
    public async Task<IActionResult> RemoveSong(
        int playlistId,
        int songId)
    {
        try
        {
            await _repository.RemoveSongAsync(
                                    playlistId,
                                    songId);

            return Ok(new
            {
                Message = "Song Removed"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }
}