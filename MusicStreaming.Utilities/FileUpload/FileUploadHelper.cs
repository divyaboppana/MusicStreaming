using Microsoft.AspNetCore.Http;

namespace MusicStreaming.Utilities.Services;

public static class FileUploadHelper
{
    public static async Task<string> SaveFileAsync(
        IFormFile file,
        string folderPath)
    {
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }

        var fileName =
            $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

        var fullPath =
            Path.Combine(folderPath, fileName);

        using var stream =
            new FileStream(fullPath, FileMode.Create);

        await file.CopyToAsync(stream);

        return fileName;
    }
}