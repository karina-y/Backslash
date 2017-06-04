using System.Web.Mvc;

namespace Backslash.Web.Controllers
{
    [Authorize]
    public class SearchController : Controller
    {
        public ActionResult General()
        {
            return View();
        }

        public ActionResult Inspiration()
        {
            return View();
        }
    }
}
