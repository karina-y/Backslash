using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Backslash.Web.Startup))]
namespace Backslash.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
