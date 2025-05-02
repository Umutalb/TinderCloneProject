namespace DatingApp2025.Models
{
    public class User
    {
        public string Id { get; set; } // Firestore document ID
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Bio { get; set; }
        public string Gender { get; set; }
        public string SexualOrientation { get; set; }
        public DateTime Birthdate { get; set; }
        public string ProfilePictureUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Location { get; set; }
        public List<string> Hobbies { get; set; }
        public List<string> Tags { get; set; }
        public bool IsVerified { get; set; } // Web API tarafından eklendi
    }
}
