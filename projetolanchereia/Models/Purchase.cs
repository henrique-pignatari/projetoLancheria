using System.ComponentModel.DataAnnotations;

namespace projetoLancheriaBackend.Models
{
    public class Purchase
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public IList<Product> Products { get; set; }

        [Required]
        public double Total;

        public Purchase() { }

        public Purchase(IList<Product> products, double total)
        {
            Products = products;
            Total = total;
        }
    }
}
