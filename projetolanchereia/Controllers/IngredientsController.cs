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

        [HttpGet("admin/{ingredientDescription}")]
        public async Task<ActionResult<Ingredient>> GetIngredientByDescription(string ingredientDescription)
        {
            try
            {
                var ingredient = await IngredientRepository.GetIngredientByDescriptionAsync(ingredientDescription);
                return Ok(ingredient);
            }
            catch
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO PEGAR INGREDIENTE");
            }
        }

        [HttpPost("admin")]
        public async Task<ActionResult> PostIngredient([FromBody] Ingredient ingredient)
        {
            if (await IngredientRepository.CreateIngredientAsync(ingredient))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO CRIAR NOVO INGREDIENTE");
        }

        [HttpDelete("admin/{ingredientDescription}")]
        public async Task<ActionResult> DeleteIngredient(string ingredientDescription)
        {
            if (await IngredientRepository.DeleteIngredientAsync(ingredientDescription))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO DELETAR INGREDIENTE");
        }

        [HttpPut("admin")]
        public async Task<ActionResult> UpdateIngredient([FromBody]Ingredient newIngredient)
        {
            if(await IngredientRepository.UpdateIngredientAsync(newIngredient))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO ATUALIZAR INGREDIENTE");
        }
    }
}
