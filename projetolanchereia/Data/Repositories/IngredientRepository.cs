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
                return await db.Ingredients.ToListAsync();
            }
        }

        internal static async Task<Ingredient> GetIngredientByIdAsync(int ingredientId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Ingredients
                    .FirstOrDefaultAsync(
                        ingredient => ingredient.Id == ingredientId
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
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Ingredients.Update(ingredientToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {

                    return false;
                }
            }
        }

        internal static async Task<bool> DeleteIngredientAsync(int ingredientId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Ingredient ingredientToDelete = await GetIngredientByIdAsync(ingredientId);
                    
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
