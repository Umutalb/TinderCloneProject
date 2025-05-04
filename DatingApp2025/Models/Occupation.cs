using Google.Cloud.Firestore;

namespace DatingApp2025.Models
{
    [FirestoreData]
    public class Occupation
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [FirestoreProperty("occupation")]
        public string Name { get; set; }
    }
}
