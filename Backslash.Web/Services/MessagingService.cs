using Backslash.Web.Models.Requests;
using SendGrid;
using System.Data.SqlClient;
using System.Net.Mail;

namespace Backslash.Web.Services
{
    public class MessagingService : BaseService
    {
        public static int Insert(MessagingAddRequests model, string userId)
        {
            int id = 0;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.Messaging_Insert"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)

               {
                   paramCollection.AddWithValue("@UserId", userId);
                   paramCollection.AddWithValue("@Name", model.Name);
                   paramCollection.AddWithValue("@Email", model.Email);
                   paramCollection.AddWithValue("@Message", model.Message);

                   SqlParameter p = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                   p.Direction = System.Data.ParameterDirection.Output;

                   paramCollection.Add(p);

               }, returnParameters: delegate (SqlParameterCollection param)

               {
                   int.TryParse(param["@id"].Value.ToString(), out id);
               }
               );
            return id;
        }


        public static int SendMessage(MessagingAddRequests model, string userId)
        {
            int messageId = Insert(model, userId);

            SendGridMessage myMessage = new SendGridMessage();

            myMessage.From = new MailAddress(model.Email, model.Name);

            myMessage.Subject = "Inquiry Type: ";

            myMessage.AddTo(model.Email);

            myMessage.Html = "<p>Email: " + model.Email + "</p>" + "<p>Name: " + model.Name + "</p>" + "<p>Message: " + model.Message;

            var transportWeb = new SendGrid.Web("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");

            transportWeb.DeliverAsync(myMessage);

            return messageId;
        }
    }
}
