using Microsoft.EntityFrameworkCore;
using WebAPI_postgres_react.Controllers;
using WebAPI_postgres_react.Models;

namespace WebAPI_postgres_react.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; }
}