namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models;

using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string PasswordHash { get; set; } = null!;

    public ICollection<Auction> Auctions { get; set; } = new List<Auction>();

    public ICollection<Bid> Bids { get; set; } = new List<Bid>();
}
