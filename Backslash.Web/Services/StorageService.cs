//using Amazon;
//using Amazon.S3;
//using Amazon.S3.Model;
//using Amazon.S3.Transfer;
//using System.Configuration;
//using System.IO;

//namespace Backslash.Web.Services
//{
//    public class StorageService
//    {
//        //private const string awsDirectoryName = @"main_directory";
//        private const string awsBucketName = @"backslash";


//        //public StorageService() //provides me with my login info to access my aws account
//        //{
//        //    string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
//        //    string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];
//        //    if (client == null)
//        //    {
//        //        IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);
//        //    }
//        //}

//        public static bool UploadFile(string key, Stream stream, string awsDirectoryName)
//        {
//            string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
//            string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];

//            IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

//            TransferUtilityUploadRequest uploadRequest = new TransferUtilityUploadRequest    //generates what i need to access my s3 stream
//            {
//                InputStream = stream,
//                BucketName = awsBucketName + "/" + awsDirectoryName,
//                CannedACL = S3CannedACL.AuthenticatedRead,
//                Key = key
//            };

//            TransferUtility fileTransferUtility = new TransferUtility(client);
//            fileTransferUtility.Upload(uploadRequest);  //uploadRequest: the information required to access my s3 stream
//            return true;
//        }

//        //need to pass the fileName from sql, then call s3 delete from sql delete and pass it
//        public static bool DeleteFile(string key, string awsDirectoryName)
//        {
//            string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
//            string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];

//            IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

//            client.DeleteObject(new DeleteObjectRequest()
//            {
//                BucketName = awsBucketName + "/" + awsDirectoryName,
//                Key = key
//            });
//            return true;
//        }

//        //public string GeneratePreSignedURL(string key, int expireInSeconds)
//        //{
//        //    string accessKey = ConfigurationManager.AppSettings["AWSAccessKey"];
//        //    string secretKey = ConfigurationManager.AppSettings["AWSSecretKey"];

//        //    IAmazonS3 client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.USWest2);

//        //    string urlString = string.Empty;
//        //    GetPreSignedUrlRequest request = new GetPreSignedUrlRequest //creates the presignedUrl, unique id to access files via browser
//        //    {
//        //        BucketName = awsBucketName + "/" + awsDirectoryName,
//        //        Key = key,
//        //        Expires = DateTime.Now.AddSeconds(expireInSeconds)
//        //    };

//        //    urlString = client.GetPreSignedURL(request);
//        //    return urlString;
//        //}
//    }
//}
