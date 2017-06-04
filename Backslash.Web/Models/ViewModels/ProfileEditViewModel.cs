using Backslash.Data.Entities;

namespace Backslash.Web.Models.ViewModels
{
    public class ProfileEditViewModel : BaseViewModel
    {
        public File file { get; set; }
        public int[] tags { get; set; }
    }
}
