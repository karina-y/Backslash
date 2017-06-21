//DEPRECATED
//using Backslash.Web.Models.Requests;
//using Sabio.Data;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Threading.Tasks;
//using Backslash.Web.Domain.File;
//using Newtonsoft.Json.Linq;
//using Backslash.Web.Classes;

////RETIRED IN LIEU OF ENTITY
//namespace Backslash.Web.Services
//{
//    public class FilesService : BaseService
//    {
//        public static T MapTag<T>(IDataReader reader, int actualStartingIndex = 0) where T : Tag, new()
//        {
//            T s = new T();
//            int startingIndex = actualStartingIndex;

//            s.TagId = reader.GetSafeInt32(startingIndex++);
//            s.TagSearchName = reader.GetSafeString(startingIndex++);
//            s.TagName = reader.GetSafeString(startingIndex++);
//            s.TagCategoryId = reader.GetSafeInt32(startingIndex++);

//            return s;
//        }

//        public static T MapTaggedFiles<T>(IDataReader reader, int actualStartingIndex = 0) where T : TaggedFile, new()
//        {
//            T s = new T();
//            int startingIndex = actualStartingIndex;

//            s.FileId = reader.GetSafeInt32(startingIndex++);
//            s.UserId = reader.GetSafeString(startingIndex++);
//            s.FileName = reader.GetSafeString(startingIndex++);
//            s.FilePath = reader.GetSafeString(startingIndex++);

//            return s;
//        }

//        public static PagedList<File> GetAllByTagId(int pageIndex, int pageSize, string userId, dynamic tagId)
//        {
//            File singleFile = null;
//            Tag singleTag = null;

//            List<File> fileList = null;

//            PagedList<File> filePage = null;

//            Dictionary<int, List<Tag>> dict = null;

//            int totalCount = 0;


//            DataProvider.ExecuteCmd(GetConnection, "dbo.File_SelectFilesByTagIdsWithCount"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   paramCollection.AddWithValue("@pageindex", pageIndex);
//                   paramCollection.AddWithValue("@pagesize", pageSize);
//                   paramCollection.AddWithValue("@userId", userId);
//                   paramCollection.AddWithValue("@tagId", tagId);
//               }
//               , map: delegate (IDataReader reader, short set)
//               {
//                   if (set == 0)
//                   {
//                       singleFile = MapTaggedFiles<TaggedFile>(reader);
//                       int startingIndex = 5;

//                       if (totalCount == 0)
//                       {
//                           totalCount = reader.GetSafeInt32(startingIndex++);
//                       }

//                       if (fileList == null)
//                       {
//                           fileList = new List<File>();
//                           filePage = new PagedList<File>(fileList, pageIndex, pageSize, totalCount);
//                       }
//                       fileList.Add(singleFile);
//                   }

//                   else if (set == 1)
//                   {
//                       int fileId = reader.GetSafeInt32(0);

//                       singleTag = MapTag<Tag>(reader);

//                       if (totalCount == 0)
//                       {
//                           int startingIndex = 2;
//                           totalCount = reader.GetSafeInt32(startingIndex++);
//                       }

//                       if (dict == null)
//                       {
//                           dict = new Dictionary<int, List<Tag>>();
//                       }

//                       if (!dict.ContainsKey(fileId))
//                       {
//                           dict[fileId] = new List<Tag>();
//                       }

//                       if (singleTag != null)
//                       {
//                           dict[fileId].Add(singleTag);
//                       }
//                   }
//               });

//            if (dict != null)
//            {
//                foreach (TaggedFile currentFile in fileList)
//                {
//                    if (dict.ContainsKey(currentFile.FileId))
//                    {
//                        currentFile.Tags = dict[currentFile.FileId];
//                    }
//                }
//            }

//            return filePage;
//        }

//        public static List<File> GetAllByUserId(string UserId)
//        {
//            List<File> list = null;

//            DataProvider.ExecuteCmd(GetConnection, "dbo.File_SelectByUserId",
//            inputParamMapper: delegate (SqlParameterCollection paramCollection)
//            {
//                paramCollection.AddWithValue("@UserId", UserId);
//            }
//          , map: delegate (IDataReader reader, short set)
//          {
//              File p = new File();
//              int startingIndex = 0;

//              p.FileId = reader.GetSafeInt32(startingIndex++);
//              p.UserId = reader.GetSafeString(startingIndex++);
//              p.FilePath = reader.GetSafeString(startingIndex++);
//              p.FileName = reader.GetSafeString(startingIndex++);
//              p.DateModified = reader.GetDateTime(startingIndex++);

//              if (list == null)
//              {
//                  list = new List<File>();
//              }

//              list.Add(p);
//          });
//            return list;
//        }

//        //change filesaddrequests to fileaddrequests, also the update
//        public static int Insert(FileAddRequest model, JObject fileData)
//        {
//            int id = 0;

//            DataProvider.ExecuteNonQuery(GetConnection, "dbo.File_Insert"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   //paramCollection.AddWithValue("@UserId", UserService.GetCurrentUserId());
//                   paramCollection.AddWithValue("@UserId", model.UserId);
//                   paramCollection.AddWithValue("@FileName", model.FileName);
//                   paramCollection.AddWithValue("@FilePath", model.FilePath);

//                   SqlParameter p = new SqlParameter("@FileId", SqlDbType.Int);
//                   p.Direction = ParameterDirection.Output;

//                   paramCollection.Add(p);

//               }, returnParameters: delegate (SqlParameterCollection param)
//               {
//                   int.TryParse(param["@id"].Value.ToString(), out id);
//               }
//               );

//            InsertTags(model, fileData, id);

//            return id;
//        }

//        public static int InsertTags(FileAddRequest model, JObject fileData, int id)
//        {
//            //int id = 0;

//            var tagCounter = fileData["Tags"].Values();

//            foreach (var singleTag in tagCounter)
//            {

//                DataProvider.ExecuteNonQuery(GetConnection, "dbo.FileTag_Insert"
//                   , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//                   {
//                       paramCollection.AddWithValue("@FileTagId", id);
//                       paramCollection.AddWithValue("@TagId", singleTag.ToString());
//                   }
//                   );
//            }
//            return id;
//        }

//        //InMemoryMultipartStreamProvider: custom class that extracts the data from my uploaded file
//        public static async Task<List<string>> Upload(InMemoryMultipartStreamProviderService provider, JObject fileData, string directory, string userId)
//        {
//            int counter = provider.Files.Count;

//            //instantiating an object (thing = new thing()), you set up a variable and are creating an object that your variable represents
//            List<string> fileNames = new List<string>();
//            FileAddRequest model = new FileAddRequest();

//            //loops through my upload criteria to allow multiple uploads to be named and uploaded appropriately
//            for (int i = 0; i < counter; i++)
//            {
//                // = {InMemoryMultipartStreamProvider}.{form-data; name="fileUpload4"; filename="imageName.jpg"} <<<-----(files uploaded and their metadata)
//                HttpContent file = provider.Files[i];  
//                string fileName = await ProcessFile(file, directory);
//                fileNames.Add(fileName);
//                //creating the model here
//                model.FileName = fileName;
//                model.FilePath = "https://backslash.s3-us-west-2.amazonaws.com/" + directory + "/" + fileName.Replace(" ", "%20");
//                model.UserId = userId;
//                int messageId = Insert(model, fileData);
//            }
//            return fileNames;
//        }

//        private static async Task<string> ProcessFile(HttpContent file, string directory)
//        {
//            Random random = new Random();
//            string rawFileName = file.Headers.ContentDisposition.FileName; //targeting the original file name
//            MediaTypeHeaderValue type = file.Headers.ContentType;
//            string fileName = Guid.NewGuid() + "_" + rawFileName.Replace("\"", string.Empty); //formatting the file name

//            try
//            {
//                System.IO.Stream fileStream = await file.ReadAsStreamAsync(); // = my uploaded file.Serialize the HTTP content and return a stream that represents the content as an asynchronous operation.
//                StorageService.UploadFile(fileName, fileStream, directory);    //(formatted file name, serialized file data in stream form)
//            }

//            catch (Exception e)
//            {
//                Console.WriteLine("Error reading from {0}. Message = {1}" + e.Message);
//            }

//            return fileName;
//        }

//        public static void Update(FileUpdateRequest model)
//        {
//            DataProvider.ExecuteNonQuery(GetConnection, "dbo.File_Update"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   paramCollection.AddWithValue("@FilePath", model.FilePath);
//                   paramCollection.AddWithValue("@FileName", model.FileName);
//                   paramCollection.AddWithValue("@FileId", model.FileId);
//               });
//        }

//        //public static List<File> GetAll()
//        //{
//        //    List<File> list = null;

//        //    DataProvider.ExecuteCmd(GetConnection, "dbo.Files_Select"
//        //       , inputParamMapper: null
//        //       , map: delegate (IDataReader reader, short set)
//        //       {
//        //           File p = MapFile(reader);

//        //           if (list == null)
//        //           {
//        //               list = new List<File>();
//        //           }

//        //           list.Add(p);
//        //       }
//        //       );
//        //    return list;
//        //}

//        public static File GetFileById(int id)
//        {
//            File File = null;

//            DataProvider.ExecuteCmd(GetConnection, "dbo.File_SelectById"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   paramCollection.AddWithValue("@FileId", id);
//               }
//               , map: delegate (IDataReader reader, short set)
//               {
//                   File = MapFile(reader);
//               }
//               );
//            return File;
//        }

//        public static File MapFile(IDataReader reader)
//        {
//            File File = new File();
//            int startingIndex = 0; //startingOrdinal

//            File.FileId = reader.GetSafeInt32(startingIndex++);
//            File.UserId = reader.GetSafeString(startingIndex++);
//            File.FileName = reader.GetSafeString(startingIndex++);
//            File.FilePath = reader.GetSafeString(startingIndex++);
//            File.DateModified = reader.GetSafeDateTime(startingIndex++);

//            return File;
//        }

//        public static void DeleteFileById(int id, string directory)
//        {
//            File getFile = GetFileById(id);
//            string fileName = getFile.FileName;

//            StorageService.DeleteFile(fileName, directory);

//            DataProvider.ExecuteNonQuery(GetConnection, "dbo.File_DeleteById"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   paramCollection.AddWithValue("@FileId", id);
//               });

//            DeleteTagById(id);
//        }

//        public static void DeleteTagById(int id)
//        {
//            DataProvider.ExecuteNonQuery(GetConnection, "dbo.FileTag_DeleteById"
//               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
//               {
//                   paramCollection.AddWithValue("@FileId", id);
//               });
//        }

//        public static List<TagWithCategory> GetTags()
//        {
//            List<TagWithCategory> list = null;

//            DataProvider.ExecuteCmd(GetConnection, "dbo.Tag_SelectTags",
//            inputParamMapper: delegate (SqlParameterCollection paramCollection) { }
//          , map: delegate (IDataReader reader, short set)
//          {
//              TagWithCategory tag = new TagWithCategory();
//              int startingIndex = 0;

//              tag.TagId = reader.GetSafeInt32(startingIndex++);
//              tag.TagSearchName = reader.GetSafeString(startingIndex++);
//              tag.TagName = reader.GetSafeString(startingIndex++);
//              tag.TagCategoryId = reader.GetSafeInt32(startingIndex++);
//              var skip = reader.GetSafeInt32(startingIndex++);
//              tag.Category = reader.GetSafeString(startingIndex++);

//              if (list == null)
//              {
//                  list = new List<TagWithCategory>();
//              }

//              list.Add(tag);
//          });

//            return list;
//        }

//    }
//}