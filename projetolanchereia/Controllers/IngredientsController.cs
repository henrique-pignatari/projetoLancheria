using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projetoLancheriaBackend.Data.Repositories;
using projetoLancheriaBackend.Models;

namespace projetoLancheriaBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Ingredient>>> GetIngredients()
        {

            try
            {
                var ingredients = await IngredientRepository.GetIngredientsAsync();
                return Ok(ingredients);

            }
            catch
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO PEGAR INGREDIENTES");
            }
        }

        [HttpGet("admin/{id}")]
        public async Task<ActionResult<Ingredient>> GetIngredientById(int id)
        {
            try
            {
                var ingredient = await IngredientRepository.GetIngredientByIdAsync(id);
                return Ok(ingredient);
            }
            catch
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO PEGAR INGREDIENTE");
            }
        }

        [HttpPost("admin/")]
        public async Task<ActionResult> PostIngredient([FromBody] Ingredient ingredient)
        {
            if (await IngredientRepository.CreateIngredientAsync(ingredient))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO CRIAR NOVO INGREDIENTE");
        }

        [HttpDelete("admin/{id}")]
        public async Task<ActionResult> DeleteIngredient(int id)
        {
            if (await IngredientRepository.DeleteIngredientAsync(id))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO DELETAR INGREDIENTE");
        }
    }
}
