using Backslash.Data.Entities;
using Backslash.Data.Helpers;
using Backslash.Data.Repositories;
using Backslash.Service.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backslash.Service.Services
{
    public class FileService : IFileService
    {
        #region Fields
        private FileRepository _fileRepository;
        #endregion

        #region Constructor
        public FileService()
        {
            _fileRepository = new FileRepository();
        }
        #endregion


        public List<File> GetFilesByUserId(string directory, string userId)
        {
            return _fileRepository.GetFilesByUserId(directory, userId);
        }

        public File GetFileByFileIdAndUserId(int fileId, string userId)
        {
            return _fileRepository.GetFileByFileIdAndUserId(fileId, userId);
        }

        public Task<bool> AddFile(InMemoryMultipartStreamProviderService provider, string directory, string userId)
        {
            return _fileRepository.AddFile(provider, directory, userId);
        }

        public bool UpdateFile(File file, string userId)
        {
            return _fileRepository.UpdateFile(file, userId);
        }

        public bool DeleteFileByFileId(int fileId, string userId)
        {
            return _fileRepository.DeleteFileByFileId(fileId, userId);
        }

        public List<Tag> GetAllTags()
        {
            return _fileRepository.GetAllTags();
        }

        public bool AddOrUpdateFileTags(int fileId, List<Tag> tags)
        {
            return _fileRepository.AddOrUpdateFileTags(fileId, tags);
        }

        public List<File> GetFileByTags(List<FileTag> tags, string directory, string userId)
        {
            return _fileRepository.GetFileByTags(tags, directory, userId);
        }

    }
}
