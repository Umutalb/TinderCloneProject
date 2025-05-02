namespace DatingApp2025.Models
{
    public class Match
    {
        public string Id { get; set; }
        public string User1Id { get; set; }
        public string User2Id { get; set; }
        public DateTime MatchedAt { get; set; }
        public string Status { get; set; }
    }
}
