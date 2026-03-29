namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models;
using System.ComponentModel.DataAnnotations;

public class Bid
{
    public int Id { get; set; }

    [Required]
    public int AuctionId { get; set; }

    public Auction? Auction { get; set; }

    [Required]
    public int BuyerId { get; set; }

    public User? Buyer { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}