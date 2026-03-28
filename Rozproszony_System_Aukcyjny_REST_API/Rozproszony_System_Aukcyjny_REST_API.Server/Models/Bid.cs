namespace Rozproszony_System_Aukcyjny_REST_API.Server.Models
{
    public class Bid
    {
        public int Id { get; set; }

        public int AuctionId { get; set; }

        public Auction Auction { get; set; } = null!;

        public int BuyerId { get; set; }

        public User Buyer { get; set; } = null!;

        public decimal Amount { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
