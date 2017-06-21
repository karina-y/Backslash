using System.ComponentModel.DataAnnotations;

namespace Backslash.Web.Models.Requests
{
    public class MessagingAddRequests
    {
        [Required, StringLength(100)]
        public string Name { get; set; }

        [Required, StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required, StringLength(2000)]
        public string Message { get; set; }
    }
}
