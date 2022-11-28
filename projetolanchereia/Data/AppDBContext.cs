using Microsoft.EntityFrameworkCore;
using projetoLancheriaBackend.Models;

namespace projetoLancheriaBackend.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Material> Materials { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("Data Source=./AppDB.db");

    }
}
