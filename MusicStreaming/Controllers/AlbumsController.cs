using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicStreaming.Core.DTOs.Album;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using MusicStreaming.Utilities.Services;
using System.Security.Claims;

namespace MusicStreaming.API.Controllers;

[ApiController]
[Route("api/albums")]
public class AlbumController : ControllerBase
{
    private readonly IAlbumRepository _repository;

    public AlbumController(IAlbumRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await _repository.GetAsync(null));

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
            var album = await _repository.GetDetailAsync(id);

            if (album is null)
                return NotFound();

            return Ok(album);
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
    public async Task<IActionResult> Create([FromForm] AlbumCreateDto dto)
    {
        try
        {
            var fileName = await FileUploadHelper.SaveFileAsync(
            dto.CoverImage,
            Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "Albums"));

            var userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var album = new Album
            {
                Title = dto.Title,
                ArtistId = dto.ArtistId,
                ReleaseYear = dto.ReleaseYear,
                CoverImageUrl = $"/Uploads/Albums/{fileName}",
                CreatedBy = userId
            };

            await _repository.UpsertAsync(album);

            return Ok(new { Message = "Album Added" });
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