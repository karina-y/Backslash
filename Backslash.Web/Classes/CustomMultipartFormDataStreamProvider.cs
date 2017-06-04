using System.Net.Http;

namespace Backslash.Web.Classes
{
    /// <summary>
    /// Corrects the file name during upload.
    /// </summary>
    /// <remarks>>
    /// additional information http://www.strathweb.com/2012/08/a-guide-to-asynchronous-file-uploads-in-asp-net-web-api-rtm/
    /// </remarks>
    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path)
        {

        }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            var suppliedName = headers.ContentDisposition.FileName.Replace("\"", string.Empty); // this is here to deal with escaped quotation marks
            return !string.IsNullOrWhiteSpace(suppliedName) ? suppliedName : "NoName";
        }
    }
}