using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Backslash.Web.Services
{
    public class InMemoryMultipartStreamProviderService : MultipartStreamProvider
    {
        private NameValueCollection formData = new NameValueCollection();   //NameValueCollection: allows many values for one key
        private List<HttpContent> fileContents = new List<HttpContent>();
        private Collection<bool> isFormData = new Collection<bool>();

        public NameValueCollection FormData
        {
            get { return this.formData; }
        }

        public List<HttpContent> Files
        {
            get { return this.fileContents; }   //fileContents: content disposition info (ContentDisposition: {form-data; name="fileUpload4"; filename="hypno cage.jpg"})
        }

        public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
        {
            ContentDispositionHeaderValue contentDisposition = headers.ContentDisposition;  //content disposition info
            if (contentDisposition != null) //makes sure the proper information has been received by the file
            {
                this.isFormData.Add(string.IsNullOrEmpty(contentDisposition.FileName));

                return new MemoryStream();
            }
            throw new InvalidOperationException(string.Format("Did not find required '{0}' header field in MIME multipart body part.", "Content-Disposition"));
        }

        public override async Task ExecutePostProcessingAsync()
        {
            for (int index = 0; index < Contents.Count; index++)
            {
                if (this.isFormData[index])
                {
                    HttpContent formContent = Contents[index];

                    ContentDispositionHeaderValue contentDisposition = formContent.Headers.ContentDisposition;
                    string formFieldName = UnquoteToken(contentDisposition.Name) ?? string.Empty;

                    string formFieldValue = await formContent.ReadAsStringAsync();
                    this.FormData.Add(formFieldName, formFieldValue);
                }
                else
                {
                    this.fileContents.Add(this.Contents[index]);    //Contents: file data headers
                }
            }
        }

        private static string UnquoteToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return token;
            }

            if (token.StartsWith("\"", StringComparison.Ordinal) && token.EndsWith("\"", StringComparison.Ordinal) && token.Length > 1)
            {
                return token.Substring(1, token.Length - 2);
            }

            return token;
        }
    }
}
