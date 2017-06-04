using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backslash.Data.Entities
{
    [Table("TagCategory", Schema = "dbo")]
    public class TagCategory
    {
        [Key]
        public int TagCategoryId { get; set; }
        public string Category { get; set; }
    }
}
