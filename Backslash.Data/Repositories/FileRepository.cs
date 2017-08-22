using System;
using System.Collections.Generic;
using System.Linq;
using Backslash.Data.Entities;
using System.Threading.Tasks;
using Backslash.Data.Helpers;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Backslash.Data.Repositories
{
    public class FileRepository
    {
        public FileRepository()
        {
            //
        }


        //get files by userid
        public List<File> GetFilesByUserId(string directory, string userId)
        {
            using (var _dc = new DataContext())
            {
                return _dc.Files.Include("FileTags")
                    .Include("FileTags.Tag")
                    .Include("FileTags.Tag.TagCategory")
                    .Where(x => x.UserId == userId && x.FileDirectory.ToLower() == directory.ToLower())
                    .ToList();
            }
        }


        //get file by fileid
        public File GetFileByFileIdAndUserId(int fileId, string userId)
        {
            using (var _dc = new DataContext())
            {
                return _dc.Files.Include("FileTags").Include("FileTags.Tag").Include("FileTags.Tag.TagCategory").FirstOrDefault(x => x.FileId == fileId);
            }
        }


        //InMemoryMultipartStreamProvider: custom class that extracts the data from my uploaded file
        public async Task<bool> AddFile(InMemoryMultipartStreamProviderService provider, string directory, string userId)
        {
            //instantiating an object (thing = new thing()), you set up a variable and are creating an object that your variable represents
            List<string> fileNames = new List<string>();
            List<Tag> tags = new List<Tag>();
            File model = new File();
            string jsonTags = provider.FormData["fileTags"];

            if (!String.IsNullOrEmpty(jsonTags))
                tags = JsonConvert.DeserializeObject<List<Tag>>(jsonTags);


            // = {InMemoryMultipartStreamProvider}.{form-data; name="fileUpload4"; filename="imageName.jpg"} <<<-----(files uploaded and their metadata)
            //HttpContent file = provider.Files[0];
            string fileName = await ProcessFile(provider.FormData["fileName"], directory, provider.FormData["base64Image"]);
            fileNames.Add(fileName);

            model.FileName = fileName;
            model.FileDirectory = directory;
            model.FilePath = "https://backslash.s3-us-west-2.amazonaws.com/" + model.FileDirectory + "/" + fileName.Replace(" ", "%20");
            model.UserId = userId;

            using (DataContext _dc = new DataContext())
            {
                bool result = false;

                var entity = _dc.Files.FirstOrDefault(x => x.FileId == model.FileId);

                if (entity == null)
                {
                    entity = new File();
                    entity.UserId = model.UserId;
                    entity.FileName = model.FileName;
                    entity.FilePath = model.FilePath;
                    entity.FileDirectory = model.FileDirectory;
                    entity.DateAdded = DateTimeOffset.Now;
                    entity.DateModified = DateTimeOffset.Now;

                    _dc.Files.Add(entity);
                }
                else
                {
                    entity.FileName = model.FileName;
                    entity.DateModified = DateTimeOffset.Now;
                }

                result = Convert.ToBoolean(_dc.SaveChanges());

                //if the upload was successful, insert or update any related tags
                if (result)
                {
                    result = AddOrUpdateFileTags(entity.FileId, tags);
                }

                return result;
            }
        }


        private static async Task<string> ProcessFile(string fileName, string directory, string base64Image)
        {
            //Random random = new Random();

            ////targeting the original file name
            //string rawFileName = file.Headers.ContentDisposition.FileName;
            //MediaTypeHeaderValue type = file.Headers.ContentType;

            ////formatting the file name
            //string fileName = Guid.NewGuid() + "_" + rawFileName.Replace("\"", string.Empty);

            if (String.IsNullOrEmpty(fileName))
                fileName = Guid.NewGuid().ToString();
            else
                fileName = Guid.NewGuid().ToString() + "_" + fileName.Replace("\"", string.Empty);

            try
            {
                // = my uploaded file.Serialize the HTTP content and return a stream that represents the content as an asynchronous operation.
                //System.IO.Stream fileStream = await file.ReadAsStreamAsync();

                //(formatted file name, serialized file data in stream form)

                var base64 = base64Image.Replace("data:image/png;base64,", "");

                StorageService.UploadFile(fileName, directory, base64);
            }

            catch (Exception e)
            {
                throw;
            }

            return fileName;
        }


        //update tags and name
        public bool UpdateFile(File file, string userId)
        {
            bool result = false;

            using (DataContext _dc = new DataContext())
            {
                File entity = _dc.Files.FirstOrDefault(x => x.FileId == file.FileId && x.UserId == userId);

                if (entity != null)
                {
                    entity.FileName = file.FileName;
                    _dc.SaveChanges();

                    List<Tag> tags = new List<Tag>();

                    if (file.FileTags != null)
                    {
                        foreach (var fileTag in file.FileTags)
                        {
                            tags.Add(new Tag { TagId = fileTag.TagId });
                        }
                    }

                    result = AddOrUpdateFileTags(file.FileId, tags);
                }
            }

            return result;
        }


        //delete file
        public bool DeleteFileByFileId(int fileId, string userId)
        {
            using (var _dc = new DataContext())
            {
                var entity = _dc.Files.FirstOrDefault(x => x.FileId == fileId && x.UserId == userId);

                bool awsDeleted = StorageService.DeleteFile(entity.FileName, entity.FileDirectory);

                if (awsDeleted)
                    _dc.Files.Remove(entity);
                else
                    return false;
                return Convert.ToBoolean(_dc.SaveChanges());
            }
        }


        //get all tags for displaying
        public List<Tag> GetAllTags()
        {
            using (var _dc = new DataContext())
            {
                return _dc.Tags.Include("TagCategory").ToList();
            }
        }


        //update file tags
        public bool AddOrUpdateFileTags(int fileId, List<Tag> tags)
        {
            using (var _dc = new DataContext())
            {
                bool result = false;

                var entities = _dc.FileTags.Where(x => x.FileId == fileId);

                //if there are any tags, remove them all so we can insert the new ones
                if (entities != null)
                {
                    foreach (var item in entities)
                    {
                        _dc.FileTags.Remove(item);
                    }

                    result = Convert.ToBoolean(_dc.SaveChanges());
                }

                //insert new tags, if any
                if (tags.Count() > 0)
                {
                    foreach (var tag in tags)
                    {
                        var entity = new FileTag();
                        entity.FileId = fileId;
                        entity.TagId = tag.TagId;
                        entity.DateAdded = DateTimeOffset.Now;

                        _dc.FileTags.Add(entity);

                        result = Convert.ToBoolean(_dc.SaveChanges());
                    }
                }

                return result;
            }
        }


        //find files by tags
        public List<File> GetFileByTags(List<FileTag> tags, string directory, string userId)
        {
            using (var _dc = new DataContext())
            {
                //need to find all files with userid
                var files = _dc.Files.Include("FileTags")
                    .Include("FileTags.Tag")
                    .Include("FileTags.Tag.TagCategory")
                    .Where(x => x.UserId == userId && x.FileDirectory == directory)
                    .ToList();


                for (int i = files.Count - 1; i >= 0; i--)
                {
                    var matches = files[i].FileTags.Select(x => x.TagId).Intersect(tags.Select(y => y.TagId)).ToList();

                    //if it wasn't a match, remove the file from the list
                    if (matches.Count != tags.Count)
                        files.Remove(files[i]);
                }

                return files;
            }
        }
    }
}
