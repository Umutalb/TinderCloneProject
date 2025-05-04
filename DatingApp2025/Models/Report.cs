namespace DatingApp2025.Models
{
    public class Report
    {
        public string Id { get; set; }
        public string ReportedBy { get; set; }
        public string ReportedUser { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
