using System.ComponentModel.DataAnnotations;

namespace WebAPI_postgres_react.Models;

public class TodoItem
{
    public long Id { get; set; }
    
    [Required]
    [StringLength(100)] // Sets the maximum string length
    public string? Description { get; set; }
    
    public bool IsComplete { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}