using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projetoLancheriaBackend.Data.Repositories;
using projetoLancheriaBackend.Models;

namespace projetoLancheriaBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Product>>> GetProducts()
        {
            //var alface = new Ingredient("Alface", 0.40);
            //var bacon = new Ingredient("Bacon", 2.00);
            //var hamburguer = new Ingredient("Hamburguer", 3.00);
            //var ovo = new Ingredient("Ovo", 0.80);
            //var queijo = new Ingredient("Queijo", 1.50);

            //var materials = new List<Material>();

            //materials.Add(new Material(bacon,1));
            //materials.Add(new Material(hamburguer, 1));
            //materials.Add(new Material(queijo, 1));
            //var xBacon = new Product("X-BACON",materials);

            //await ProductRepository.CreateProductAsync(xBacon);

            //materials = new List<Material>();

            //materials.Add(new Material(hamburguer, 1));
            //materials.Add(new Material(queijo, 1));
            //var xBurguer = new Product("X-BURGUER", materials);

            //await ProductRepository.CreateProductAsync(xBurguer);

            //materials = new List<Material>();

            //materials.Add(new Material(ovo, 1));
            //materials.Add(new Material(hamburguer, 1));
            //materials.Add(new Material(queijo, 1));
            //var xEgg = new Product("X-EGG", materials);

            //await ProductRepository.CreateProductAsync(xEgg);

            //materials = new List<Material>();

            //materials.Add(new Material(ovo, 1));
            //materials.Add (new Material(bacon, 1));
            //materials.Add(new Material(hamburguer, 1));
            //materials.Add(new Material(queijo, 1));
            //var xEggBacon = new Product("X-EGGBACON", materials);

            //await ProductRepository.CreateProductAsync(xEggBacon);

            try
            {
                var products = await ProductRepository.GetProductsAsync();
                return Ok(products);

            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO PEGAR PRODUTOS");
            }
        }

        [HttpGet("admin/{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            try
            {
                var product = await ProductRepository.GetProductByIdAsync(id);
                return Ok(product);
            }
            catch
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO PEGAR PRODUTO");
            }
        }

        [HttpPost("admin/")]
        public async Task<ActionResult> PostProduct([FromBody] Product product)
        {
            if (await ProductRepository.CreateProductAsync(product))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO CRIAR NOVO PRODUTO");
        }

        [HttpDelete("admin/{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            if (await ProductRepository.DeleteProductAsync(id))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO DELETAR PRODUTO");
        }
    }
}
