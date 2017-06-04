using System;
using System.Collections.Generic;

namespace Backslash.Web.Models.ViewModels
{
    public class BaseViewModel
    {
        public bool IsLoggedIn { get; set; }
        public string BaseUrl { get; set; }
        public string SiteDomain { get; set; }
        public bool IsAdmin { get; set; }
        //public PublicUser CurrentUser { get; set; }
        public string GoogleApiKey { get; set; }
        //public string AvatarFilePath { get; set; }

        public List<String> ErrorMessages { get; set; }

        public List<String> SuccessMessages { get; set; }

        public bool PrinterFriendly { get; set; }

        public BaseViewModel()
        {
            this.ErrorMessages = new List<string>();
            this.SuccessMessages = new List<string>();
        }
    }
}
