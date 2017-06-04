using Backslash.Data.Entities;
using Backslash.Data.Repositories;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Backslash.Web.Controllers
{
    [Authorize]
    public class AngularController : BaseController
    {
        private FileRepository _fileRepository = new FileRepository();

        public AngularController()
        {
        }

        [HttpPost]
        public JsonResult GetFileByFileIdAndUserId(int id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileRepository.GetFileByFileIdAndUserId(id, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllTags()
        {
            var results = new JavaScriptSerializer().Serialize(_fileRepository.GetAllTags());

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFilesByUserId(string id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileRepository.GetFilesByUserId(id, GetUserID()));
            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSelectedTags(int id)
        {
            var file = _fileRepository.GetFileByFileIdAndUserId(id, GetUserID());

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
            var results = new JavaScriptSerializer().Serialize(_fileRepository.UpdateFile(file, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetFileByTags(File file)
        {
            var results = new JavaScriptSerializer().Serialize(_fileRepository.GetFileByTags(file.FileTags, file.FileDirectory, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public JsonResult DeleteFileById(int id)
        {
            var results = new JavaScriptSerializer().Serialize(_fileRepository.DeleteFileByFileId(id, GetUserID()));

            return Json(results, JsonRequestBehavior.AllowGet);
        }
    }
}