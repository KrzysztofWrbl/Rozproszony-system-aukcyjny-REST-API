namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models;
using System.ComponentModel.DataAnnotations;

public enum AuctionStatus
{
    Active,
    Finished
}

public class Auction
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = null!;

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = null!;

    [Range(0.01, double.MaxValue)]
    public decimal StartingPrice { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal CurrentPrice { get; set; }

    public DateTime StartTime { get; set; } = DateTime.UtcNow;

    public DateTime EndTime { get; set; }

    public int SellerId { get; set; }

    public User? Seller { get; set; }

    public int? WinnerId { get; set; }

    public User? Winner { get; set; }

    public ICollection<Bid> Bids { get; set; } = new List<Bid>();

    public AuctionStatus Status =>
        DateTime.UtcNow >= EndTime ? AuctionStatus.Finished : AuctionStatus.Active;
}