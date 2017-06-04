using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backslash.Data.Entities
{
    [Table("File", Schema = "dbo")]
    public class File
    {
        [Key]
        public int FileId { get; set; }
        public string UserId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileDirectory { get; set; }
        public DateTimeOffset DateAdded { get; set; }
        public DateTimeOffset DateModified { get; set; }
        public virtual List<FileTag> FileTags { get; set; }
    }
}