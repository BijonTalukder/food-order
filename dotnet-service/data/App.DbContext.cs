using System.Security.Cryptography.X509Certificates;
using dotnet_service.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_service.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>
        options
        ) : base(options)
        {

        }
        public DbSet<Order> Orders
        {
            get;
            set;
        }

    }
}