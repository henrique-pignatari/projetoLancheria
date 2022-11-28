using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projetoLancheriaBackend.Models
{
    public class Purchase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        public virtual List<Product> Products { get; set; }

        [Required]
        public double Total;

        public Purchase()
        { 
            Products = new List<Product>();
        }

        public Purchase(List<Product> products, double total)
        {
            Products = products;
            Total = total;
        }
    }
}
