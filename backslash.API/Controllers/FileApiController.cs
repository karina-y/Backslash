using Backslash.Data.Entities;
using Backslash.Data.Helpers;
using Backslash.Service.Interfaces;
using Backslash.Web.Models.Responses;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace backslash.API.Controllers
{
    [RoutePrefix("api/files")]
    public class FileApiController : ApiController
    {
        #region Fields
        private IFileService _fileService;
        #endregion

        #region Constructor
        public FileApiController(IFileService fileService)
        {
            _fileService = fileService;
        }
        #endregion

        //kytodo userid needs to come in via the request
        //private string GetUserID()
        //{
        //    if (User.Identity.IsAuthenticated)
        //        return User.Identity.GetUserId();

        //    else
        //        return "";
        //}

        [Route("AddFile/{directory}"), HttpPost]
        //async: In an asynchronous process, the application can continue with other work that doesn't depend on the web resource until the potentially blocking task finishes.
        public async Task<HttpResponseMessage> AddFile(string directory)
        {
            //kytodo fix userid
            //string userId = GetUserID();
            string userId = "";
            HttpContent content = Request.Content;
            string model = "";
            List<Tag> tags = new List<Tag>();

            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }


            InMemoryMultipartStreamProviderService provider = await content.ReadAsMultipartAsync(new InMemoryMultipartStreamProviderService());


            if (provider.FormData["base64Image"] == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            ItemResponse<bool> response = new ItemResponse<bool>();

            response.Item = await _fileService.AddFile(provider, directory, userId);

            return Request.CreateResponse(response);
        }
    }
}
