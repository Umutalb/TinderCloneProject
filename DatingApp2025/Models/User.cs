using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;

namespace DatingApp2025.Models
{
    [FirestoreData]
    public class User
    {
        [FirestoreDocumentId]
        public string? Id { get; set; }

        [FirestoreProperty("username")]
        public string Username { get; set; }

        [FirestoreProperty("email")]
        public string Email { get; set; }

        [FirestoreProperty("password")]
        public string Password { get; set; }

        [FirestoreProperty("bio")]
        public string Bio { get; set; }

        [FirestoreProperty("gender")]
        public string Gender { get; set; }

        [FirestoreProperty("sexualOrientation")]
        public string SexualOrientation { get; set; }

        [FirestoreProperty("birthdate")]
        public DateTime Birthdate { get; set; }

        [FirestoreProperty("profilePictureUrl")]
        public string ProfilePictureUrl { get; set; }

        [FirestoreProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [FirestoreProperty("location")]
        public string Location { get; set; }

        [FirestoreProperty("hobbies")]
        public List<string> Hobbies { get; set; }

        [FirestoreProperty("isVerified")]
        public bool IsVerified { get; set; }

        [FirestoreProperty("occupation")]
        public string Occupation { get; set; }
    }
}
