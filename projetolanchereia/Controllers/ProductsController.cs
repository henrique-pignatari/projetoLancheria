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
            //var ovo = new Ingredient("Ovo", 0.50);
            //var hamburguer = new Ingredient("harmburguer", 3.50);

            //var material1 = new Material(ovo, 1);
            //var material2 = new Material(hamburguer, 3);

            //var materials = new List<Material>();

            //materials.Add(material1);
            //materials.Add(material2);

            //var product = new Product("X-TESTE", materials);

            //if (!await ProductRepository.CreateProductAsync(product))
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, "PENIS");
            //}

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
