using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace projetoLancheriaBackend.Models
{
    [Owned]
    public class Material
    {
        public Ingredient Ingredient { get; set; }
        public int Quantity { get; set; }

        public Material()
        {

        }
       
        //public Material(Ingredient ingredient, int quantity)
        //{
        //    Ingredient = ingredient;
        //    Quantity = quantity;
        //}

    }
}
