////DEPRECATED
//using Backslash.Data.Entities;
//using Backslash.Data.Helpers;
//using System.Collections.Generic;
//using System.Net;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Web.Http;
//using Microsoft.AspNet.Identity;
//using Backslash.Data.Repositories;


////rename to filecontroller, pull out of apicontrollers folder
//namespace Backslash.Web.Controllers.ApiControllers
//{
//    [RoutePrefix("api/files")]
//    public class FileApiController : ApiController
//    {
//        private FileRepository _fileRepository = new FileRepository();

//        private string GetUserID()
//        {
//            if (User.Identity.IsAuthenticated)
//                return User.Identity.GetUserId();

//            else
//                return "";
//        }

//        [Route("AddFile/{directory}"), HttpPost]
//        //async: In an asynchronous process, the application can continue with other work that doesn't depend on the web resource until the potentially blocking task finishes.
//        public async Task<HttpResponseMessage> AddFile(string directory)
//        {
//            string userId = GetUserID();
//            HttpContent content = Request.Content;
//            List<Tag> tags = new List<Tag>();

//            // Check if the request contains multipart/form-data.
//            if (!Request.Content.IsMimeMultipartContent())
//            {
//                //throw new ErrorResponse(errMsg);
//                //replace with ErrorResponse class, pass an error string
//                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
//            }


//            //Request: info from the ajax call
//            InMemoryMultipartStreamProviderService provider = await content.ReadAsMultipartAsync(new InMemoryMultipartStreamProviderService());


//            //if (provider.FormData["fileTags"] == null)
//            //{
//            //    throw new HttpResponseException(HttpStatusCode.BadRequest);
//            //}

//            //if (provider.FormData["fileTags"] != null)
//            //{
//            //    model = provider.FormData["fileTags"];
//            //    tags = JsonConvert.DeserializeObject<List<Tag>>(model);
//            //}

//            if (provider.FormData["base64Image"] == null)
//                throw new HttpResponseException(HttpStatusCode.BadRequest);

//            //var base64Image = provider.FormData["base64Image"];

//            // The await operator suspends Upload().
//            //  - Upload() can't continue until Upload(provider), which is in FilesService, is complete.
//            //  - Meanwhile, control returns to the caller of Upload().
//            //  - Control resumes here when Upload(provider) is complete. 
//            //  - The await operator then retrieves the string result from Upload(provider).
//            Models.Responses.ItemResponse<bool> response = new Models.Responses.ItemResponse<bool>();


//            response.Item = await _fileRepository.AddFile(provider, directory, userId);

//            return Request.CreateResponse(response);
//        }
//    }
//}
