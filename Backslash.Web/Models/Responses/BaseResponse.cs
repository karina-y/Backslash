using System;

namespace Backslash.Web.Models.Responses
{
    public abstract class BaseResponse
    {
        public bool IsSuccessFul { get; set; }

        public string TransactionId { get; set; }

        public BaseResponse()
        {
            this.TransactionId = Guid.NewGuid().ToString();
        }
    }
}
