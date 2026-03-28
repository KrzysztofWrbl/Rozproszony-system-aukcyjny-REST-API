namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models
{
    public class Auction
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Category { get; set; } = null!;

        public decimal StartingPrice { get; set; }

        public decimal CurrentPrice { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int SellerId { get; set; }

        public User Seller { get; set; } = null!;

        public ICollection<Bid> Bids { get; set; } = new List<Bid>();
    }
}
