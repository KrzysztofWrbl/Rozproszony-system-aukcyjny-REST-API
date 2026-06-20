using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Rozproszony_System_Aukcyjny_REST_API.Server.Data;
using Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;
using Rozproszony_System_Aukcyjny_REST_API.Server.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rozproszony_System_Aukcyjny_REST_API.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(
        AppDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("AuthController działa");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
        {
            return BadRequest("Email już istnieje");
        }

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Użytkownik zarejestrowany");
    }

    [HttpPost("login")]
public async Task<IActionResult> Login(LoginRequest request)
{
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == request.Email);

    if (user == null)
    {
        return Unauthorized("Nieprawidłowy email lub hasło");
    }

    bool validPassword = BCrypt.Net.BCrypt.Verify(
        request.Password,
        user.PasswordHash);

    if (!validPassword)
    {
        return Unauthorized("Nieprawidłowy email lub hasło");
    }




var claims = new[]
{
    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new Claim(ClaimTypes.Name, user.Username),
    new Claim(ClaimTypes.Email, user.Email)
};

var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

var credentials = new SigningCredentials(
    key,
    SecurityAlgorithms.HmacSha256);

var token = new JwtSecurityToken(
    issuer: _configuration["Jwt:Issuer"],
    audience: _configuration["Jwt:Audience"],
    claims: claims,
    expires: DateTime.Now.AddHours(2),
    signingCredentials: credentials);

var jwt = new JwtSecurityTokenHandler()
    .WriteToken(token);

return Ok(new
{
    Token = jwt
});
}

[Authorize]
[HttpGet("profile")]
public IActionResult Profile()
{
    return Ok(new
    {
        Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
        Username = User.Identity?.Name,
        Email = User.FindFirst(ClaimTypes.Email)?.Value
    });
}
}