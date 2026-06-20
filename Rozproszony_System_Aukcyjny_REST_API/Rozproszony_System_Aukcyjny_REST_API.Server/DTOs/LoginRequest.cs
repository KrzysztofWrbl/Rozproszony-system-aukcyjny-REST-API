using System.ComponentModel.DataAnnotations;

namespace Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;

public class LoginRequest
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}