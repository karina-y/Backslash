using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backslash.Data.Entities
{
    [Table("FileTag", Schema = "dbo")]
    public class FileTag
    {
        [Key]
        public int FileTagId { get; set; }
        public int FileId { get; set; }
        public int TagId { get; set; }
        public DateTimeOffset DateAdded { get; set; }

        [ForeignKey("TagId")]
        public virtual Tag Tag { get; set; }

        //[ForeignKey("FileId")]
        //public File File { get; set; }
    }
}
