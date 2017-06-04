using Backslash.Data.Repositories;

namespace Backslash.Service
{
    public class FileService
    {
        private FileRepository _FileRepository;

        public FileService()
        {
            _FileRepository = new FileRepository();
        }

        //public FileVenueSearch GetFileSearchById(int FileId)
        //{
        //    FileVenueSearch result = _FileRepository.GetFileSearchById(FileId);
        //    TimeZoneInfo pctTimeInfo = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
        //    result.SearchDateTime = TimeZoneInfo.ConvertTime(result.SearchDateTime, pctTimeInfo);
        //    result.SearchDateTimeDisplay = result.SearchDateTime.ToString("G");
        //    return result;
        //}

    }
}
