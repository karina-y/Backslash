using Backslash.Data.Entities;
using Backslash.Service.Interfaces;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Backslash.Web.Controllers
{
    [Authorize]
    public class AngularController : BaseController
    {
        #region Fields
        private IFileService _fileService;
        #endregion

        #region Constructor
        public AngularController(IFileService fileService)
        {
            _fileService = fileService;
        }
        #endregion

        [HttpPost]
        public JsonResult GetFileByFileIdAndUserId(int id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.GetFileByFileIdAndUserId(id, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllTags()
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.GetAllTags());

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFilesByUserId(string id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.GetFilesByUserId(id, GetUserID()));
            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSelectedTags(int id)
        {
            var file = _fileService.GetFileByFileIdAndUserId(id, GetUserID());

            var fileTags = file.FileTags;

            var tags = new int[fileTags.Count];

            if (fileTags.Count > 0)
            {
                for (var i = 0; i < fileTags.Count; i++)
                {
                    tags[i] = fileTags[i].TagId;
                }
            }

            var results = new JavaScriptSerializer().Serialize(fileTags);
            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateFile(File file)
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.UpdateFile(file, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetFileByTags(File file)
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.GetFileByTags(file.FileTags, file.FileDirectory, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult DeleteFileById(int id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileService.DeleteFileByFileId(id, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }
    }
}