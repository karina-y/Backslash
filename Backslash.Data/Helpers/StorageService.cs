using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using System;
using System.Configuration;
using System.IO;

namespace Backslash.Data.Helpers
{
    public class StorageService
    {
        private const string awsBucketName = @"backslash";

        public static bool UploadFile(string key, string awsDirectoryName, string base64Image)
        {
            string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
            string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];

            IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

            //generates what i need to access my s3 stream
            TransferUtilityUploadRequest uploadRequest = new TransferUtilityUploadRequest
            {
                //InputStream = stream,
                BucketName = awsBucketName + "/" + awsDirectoryName,
                CannedACL = S3CannedACL.AuthenticatedRead,
                Key = key
            };

            TransferUtility fileTransferUtility = new TransferUtility(client);
            byte[] bytes = Convert.FromBase64String(base64Image);

            //uploadRequest: the information required to access my s3 stream
            //fileTransferUtility.Upload(uploadRequest);


            using (var ms = new MemoryStream(bytes))
            {
                uploadRequest.InputStream = ms;
                fileTransferUtility.Upload(uploadRequest);
            }
            return true;
        }

        //need to pass the fileName from sql, then call s3 delete from sql delete and pass it
        public static bool DeleteFile(string key, string awsDirectoryName)
        {
            string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
            string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];

            IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

            try
            {
                client.DeleteObject(new DeleteObjectRequest()
                {
                    BucketName = awsBucketName + "/" + awsDirectoryName,
                    Key = key
                });
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
    }
}
