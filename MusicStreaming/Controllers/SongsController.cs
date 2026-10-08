using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicStreaming.Core.DTOs.Song;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using System.Security.Claims;

namespace MusicStreaming.API.Controllers;

[ApiController]
[Route("api/songs")]
public class SongController : ControllerBase
{
    private readonly ISongRepository _repository;

    public SongController(
        ISongRepository repository)
    {
        _repository = repository;
    }


    [HttpGet]
    public async Task<IActionResult> Get(
        int? genreId,
        string? search)
    {
        try
        {
            return Ok(
            await _repository.GetAsync(
                null,
                genreId,
                search));
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
    public async Task<IActionResult> GetById(
        int id)
    {
        try
        {
            return Ok(
           await _repository.GetAsync(
               id,
               null,
               null));
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                Message = ex.Message
            });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(
    AddSongDto dto)
    {
        try
        {
            var userId =
            Convert.ToInt32(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier));

            var song = new Song
            {
                Title = dto.Title,
                AlbumId = dto.AlbumId,
                ArtistId = dto.ArtistId,
                GenreId = dto.GenreId,
                DurationSeconds = dto.DurationSeconds,
                CreatedBy = userId
            };

            await _repository.UpsertAsync(song);

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
}