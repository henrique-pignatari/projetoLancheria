using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace projetoLancheriaBackend.Models
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        public Ingredient(string description, double price)
        {
            Description = description;
            Price = price;
        }
    }
}
