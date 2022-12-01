using Microsoft.AspNetCore.Cors;
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

        [HttpPost("admin")]
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

        [HttpPut("admin")]
        public async Task<ActionResult> UpdateProduct([FromBody] Product newProduct)
        {
            if (await ProductRepository.UpdateProductAsync(newProduct))
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "ERRO AO ATUALIZAR PRODUTO");
        }
    }
}
