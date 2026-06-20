using System.ComponentModel.DataAnnotations;

namespace Rozproszony_System_Aukcyjny_REST_API.Server.DTOs;

public class CreateBidRequest
{
    [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }
}