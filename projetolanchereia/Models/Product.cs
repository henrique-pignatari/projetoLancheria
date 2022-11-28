using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projetoLancheriaBackend.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public virtual IList<Material> Materials { get; set; }

        public Product() 
        {
            Materials = new List<Material>();
        }

        public Product(string description, List<Material> materials)
        {
            Description = description;
            Materials = materials;
        }
    }
}
