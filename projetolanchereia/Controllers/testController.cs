using Microsoft.AspNetCore.Mvc;

namespace projetoLancheriaBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class testController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Teste de comunicacao do Back com front";
        }
    }
}