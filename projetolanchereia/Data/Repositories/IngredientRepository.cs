using Microsoft.EntityFrameworkCore;
using projetoLancheriaBackend.Models;

namespace projetoLancheriaBackend.Data.Repositories
{
    internal static class IngredientRepository
    {
        internal async static Task<List<Ingredient>> GetIngredientsAsync()
        {
            using(var db = new AppDBContext())
            {
                return await db.Ingredients
                    .GroupBy(i => i.Description)
                    .Select(d => d.FirstOrDefault())
                    .ToListAsync();
            }
        }

        internal static async Task<Ingredient> GetIngredientByDescriptionAsync(string ingredientDescription)
        {
            using (var db = new AppDBContext())
            {
                return await db.Ingredients
                    .FirstOrDefaultAsync(
                        ingredient => ingredient.Description == ingredientDescription
                    );
            }
        }

        internal static async Task<bool> CreateIngredientAsync(Ingredient newIngredient)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Ingredients.AddAsync(newIngredient);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }

        internal static async Task<bool> UpdateIngredientAsync(Ingredient ingredientToUpdate)
        {
            Console.WriteLine("DESCRICAO NO METODO UPDATE: " + ingredientToUpdate.Description);

            using (var db = new AppDBContext())
            {
                try
                {
                    var ingredients = db.Ingredients
                        .Where(i => i.Description == ingredientToUpdate.Description)
                        .ToList();

                    ingredients.ForEach(i =>
                    {
                        i.Price = ingredientToUpdate.Price;
                    }
                    );
                    
                    await db.SaveChangesAsync();

                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return false;
                }
            }
        }

        internal static async Task<bool> DeleteIngredientAsync(string ingredientDescription)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var ingredientToDelete = await db.Ingredients
                        .Where(i => i.Description == ingredientDescription)
                        .ToListAsync(); ;

                    ingredientToDelete.ForEach(i => db.Remove(ingredientToDelete));
                    
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
