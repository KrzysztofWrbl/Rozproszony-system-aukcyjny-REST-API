namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public ICollection<Auction> Auctions { get; set; } = new List<Auction>();

        public ICollection<Bid> Bids { get; set; } = new List<Bid>();
    }
}
