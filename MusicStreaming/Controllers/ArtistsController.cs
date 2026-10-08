using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicStreaming.Core.DTOs.Artist;
using MusicStreaming.Core.Interfaces;
using MusicStreaming.Core.Models;
using MusicStreaming.Utilities.Services;
using System.Security.Claims;

namespace MusicStreaming.API.Controllers;

[ApiController]
[Route("api/artists")]
public class ArtistController : ControllerBase
{
    private readonly IArtistRepository _repository;

    public ArtistController(
        IArtistRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(
            await _repository.GetAsync(null));
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
            var artist = await _repository.GetDetailAsync(id);
            if (artist is null) return NotFound();
            return Ok(artist);
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
    [FromForm] ArtistCreateDto dto)
    {
        try
        {
            var fileName =
           await FileUploadHelper.SaveFileAsync(
               dto.Image,
               Path.Combine(
                   Directory.GetCurrentDirectory(),
                   "Uploads",
                   "Artists"));

            var userId =
                Convert.ToInt32(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier)?.Value);

            var artist = new Artist
            {
                ArtistName = dto.ArtistName,
                ImageUrl = $"/Uploads/Artists/{fileName}",
                CreatedBy = userId
            };

            await _repository.UpsertAsync(artist);

            return Ok(new
            {
                Message = "Artist Added"
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