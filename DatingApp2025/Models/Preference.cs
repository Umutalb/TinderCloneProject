namespace DatingApp2025.Models
{
    public class Preference
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PreferredGender { get; set; }
        public AgeRange PreferredAgeRange { get; set; }
        public List<string> PreferredTags { get; set; }
    }
}
