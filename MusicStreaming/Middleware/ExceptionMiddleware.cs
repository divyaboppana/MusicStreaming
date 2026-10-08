using Microsoft.AspNetCore.Http;

namespace MusicStreaming.Utilities.FileUpload;

public static class FileUploadHelper
{
    public static async Task<string> UploadAsync(
        IFormFile file,
        string folderPath)
    {
        try
        {
            if (file == null || file.Length == 0)
                throw new Exception("File not found.");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName =
                $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            var fullPath =
                Path.Combine(folderPath, fileName);

            using var stream =
                new FileStream(
                    fullPath,
                    FileMode.Create);

            await file.CopyToAsync(stream);

            return fileName;
        }
        catch (Exception ex)
        {
            throw new Exception(
                $"Error uploading file '{file?.FileName}'.",
                ex);
        }
    }
}