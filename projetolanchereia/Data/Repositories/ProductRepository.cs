using Microsoft.EntityFrameworkCore;
using projetoLancheriaBackend.Models;

namespace projetoLancheriaBackend.Data.Repositories
{
    internal static class ProductRepository
    {
        internal async static Task<List<Product>> GetProductsAsync() 
        {
            Console.WriteLine("ENTRANDO");
            using (var db = new AppDBContext())
            {
                return await db.Products
                    .Include(p => p.Materials)
                    .ThenInclude(M => M.Ingredient)
                    .ToListAsync();
            }
        }

        internal static async Task<Product> GetProductByIdAsync(int productId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Products
                    .FirstOrDefaultAsync(
                        product => product.Id == productId
                    );
            }
        }

        internal static async Task<bool> CreateProductAsync(Product newProduct)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Products.AddAsync(newProduct);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    return false;
                }
            }
        }

        internal static async Task<bool> UpdateProductAsync(Product productToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Products.Update(productToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal static async Task<bool> DeleteProductAsync(int productId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var ingredientToDelete = await GetProductByIdAsync(productId);

                    if (ingredientToDelete != null)
                    {
                        db.Remove(ingredientToDelete);
                    }

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }

    }
}
