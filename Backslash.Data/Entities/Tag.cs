using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backslash.Data.Entities
{
    [Table("Tag", Schema = "dbo")]
    public class Tag
    {
        [Key]
        public int TagId { get; set; }
        public string TagSearchName { get; set; }
        public string TagDisplayName { get; set; }
        public int TagCategoryId { get; set; }

        [ForeignKey("TagCategoryId")]
        public virtual TagCategory TagCategory { get; set; }
    }
}
