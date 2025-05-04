using Google.Cloud.Firestore;

namespace DatingApp2025.Models
{
    [FirestoreData]
    public class Hobby
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [FirestoreProperty("name")]
        public string Name { get; set; }

       
    }
}
