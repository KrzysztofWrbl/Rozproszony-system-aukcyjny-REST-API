using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rozproszony_System_Aukcyjny_REST_API.Server.Data;
using Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;
using Rozproszony_System_Aukcyjny_REST_API.Server.Models;
using System.Security.Claims;

namespace Rozproszony_System_Aukcyjny_REST_API.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuctionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuctionsController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateAuction(CreateAuctionRequest request)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (request.EndTime <= DateTime.UtcNow)
        {
            return BadRequest("Data zakończenia aukcji musi być w przyszłości");
        }

        var auction = new Auction
        {
            Title = request.Title,
            Description = request.Description,
            Category = request.Category,
            StartingPrice = request.StartingPrice,
            CurrentPrice = request.StartingPrice,
            EndTime = request.EndTime,
            SellerId = userId
        };

        _context.Auctions.Add(auction);
        await _context.SaveChangesAsync();

        return Ok(auction);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuction(int id)
    {
        var auction = await _context.Auctions
            .Include(a => a.Bids)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (auction == null)
        {
            return NotFound("Aukcja nie istnieje");
        }

        return Ok(auction);
    }

    [Authorize]
    [HttpPost("{id}/bids")]
    public async Task<IActionResult> PlaceBid(int id, CreateBidRequest request)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var auction = await _context.Auctions
            .FirstOrDefaultAsync(a => a.Id == id);

        if (auction == null)
        {
            return NotFound("Aukcja nie istnieje");
        }

        if (auction.EndTime <= DateTime.UtcNow)
        {
            return BadRequest("Aukcja jest już zakończona");
        }

        if (auction.SellerId == userId)
        {
            return BadRequest("Nie możesz licytować własnej aukcji");
        }

        if (request.Amount <= auction.CurrentPrice)
        {
            return BadRequest("Oferta musi być większa od aktualnej ceny");
        }

        var bid = new Bid
        {
            AuctionId = auction.Id,
            BuyerId = userId,
            Amount = request.Amount
        };

        auction.CurrentPrice = request.Amount;

        _context.Bids.Add(bid);
        await _context.SaveChangesAsync();

        return Ok(bid);
    }
}