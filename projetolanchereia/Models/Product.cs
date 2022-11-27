using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projetoLancheriaBackend.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public IList<Material> Materials { get; set; }


        public Product() { }

        public Product(string description, IList<Material> materials)
        {
            Description = description;
            Materials = materials;
        }
    }
}
