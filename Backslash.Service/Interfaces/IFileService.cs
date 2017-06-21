using Backslash.Data.Entities;
using Backslash.Data.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backslash.Service.Interfaces
{
    public interface IFileService
    {
        List<File> GetFilesByUserId(string directory, string userId);

        File GetFileByFileIdAndUserId(int fileId, string userId);

        Task<bool> AddFile(InMemoryMultipartStreamProviderService provider, string directory, string userId);

        bool UpdateFile(File file, string userId);

        bool DeleteFileByFileId(int fileId, string userId);

        List<Tag> GetAllTags();

        bool AddOrUpdateFileTags(int fileId, List<Tag> tags);

        List<File> GetFileByTags(List<FileTag> tags, string directory, string userId);
    }
}
