//NOT CURRENTLY IN USE
//using Backslash.Web.Models.Requests;
//using Backslash.Web.Models.Responses;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

//namespace Backslash.Web.Controllers.ApiControllers
//{
//    [RoutePrefix("api/messages")]
//    public class MessagingApiController : ApiController
//    {
//        public HttpResponseMessage AddMessage(MessagingAddRequests model)
//        {
//            string userId = Services.UserService.GetCurrentUserId();

//            if (!ModelState.IsValid)
//            {
//                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
//            }

//            ItemResponse<int> response = new ItemResponse<int>();
//            response.Item = Services.MessagingService.Insert(model, userId);
//            return Request.CreateResponse(response);
//        }

//        [Route, HttpPost]
//        public HttpResponseMessage SendMessage(MessagingAddRequests model)
//        {
//            string userId = Services.UserService.GetCurrentUserId();

//            if (!ModelState.IsValid)
//            {
//                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
//            }

//            SuccessResponse response = new SuccessResponse();

//            Services.MessagingService.SendMessage(model, userId);
//            return Request.CreateResponse(response);
//        }
//    }
//}
