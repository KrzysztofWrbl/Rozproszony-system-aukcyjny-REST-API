using System.ComponentModel.DataAnnotations;

namespace Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;

public class CreateAuctionRequest
{
    [Required]
    [MaxLength(50)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Category { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal StartingPrice { get; set; }

    public DateTime EndTime { get; set; }
}