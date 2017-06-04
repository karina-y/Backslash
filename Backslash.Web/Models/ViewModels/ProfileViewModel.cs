using Backslash.Data.Entities;
using System.Collections.Generic;

namespace Backslash.Web.Models.ViewModels
{
    public class ProfileViewModel : BaseViewModel
    {
        public File file { get; set; }
        public List<File> files { get; set; }
    }
}
