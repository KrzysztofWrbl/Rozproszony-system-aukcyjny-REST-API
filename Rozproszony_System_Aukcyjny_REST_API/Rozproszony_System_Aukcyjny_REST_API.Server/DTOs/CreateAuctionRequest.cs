namespace Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;

public class CreateAuctionRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public decimal StartingPrice { get; set; }

    public DateTime EndTime { get; set; }
}