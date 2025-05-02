namespace DatingApp2025.Models
{
    public class Notification
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Read {  get; set; }
    }
}
