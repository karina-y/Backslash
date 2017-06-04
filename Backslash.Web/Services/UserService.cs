using Microsoft.AspNet.Identity;
using System.Web;

namespace Backslash.Web.Services
{
    public class UserService : BaseService/*, IUserService*/
    {
        public static string GetCurrentUserId()
        {
            return HttpContext.Current.User.Identity.GetUserId();
        }
    }
}
