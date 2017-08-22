using System.Data.Entity;
using Backslash.Data.Entities;

namespace Backslash.Data
{
    public class DataContext : DbContext
    {
        public DataContext() : base("Backslash")
        {
            //
        }

        public DbSet<File> Files { get; set; }
        public DbSet<FileTag> FileTags { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TagCategory> TagCategories { get; set; }
        public DbSet<SecurityAccount> SecurityAccounts { get; set; }
        public DbSet<SecurityAccountAuthentication> SecurityAccountAuthentications { get; set; }
    }
}