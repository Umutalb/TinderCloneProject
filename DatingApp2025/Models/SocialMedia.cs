using Google.Cloud.Firestore;

namespace DatingApp2025.Models
{
    [FirestoreData]
    public class SocialMedia
    {
        [FirestoreDocumentId]
        public string? Id { get; set; }

        [FirestoreProperty("userId")]
        public string UserId { get; set; }

        [FirestoreProperty("instagram")]
        public string? Instagram { get; set; }

        [FirestoreProperty("twitter")]
        public string? Twitter { get; set; }

        [FirestoreProperty("linkedin")]
        public string? Linkedin { get; set; }
    }
}
