using Sabio.Data.Providers;
using System.Data.SqlClient;

namespace Backslash.Web.Services
{
    public abstract class BaseService
    {
        protected static IDao DataProvider
        {

            get { return Sabio.Data.DataProvider.Instance; }
        }

        protected static SqlConnection GetConnection()
        {
            return new SqlConnection(
                System.Web.Configuration.WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }
    }
}
