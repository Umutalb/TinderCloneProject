using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using DatingApp2025.Models;


namespace DatingApp2025.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SocialMediaController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public SocialMediaController()
        {
            var pathToCredentials = Path.Combine(Directory.GetCurrentDirectory(), "firebase-config", "serviceAccountKey.json");
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", pathToCredentials);

            _firestoreDb = FirestoreDb.Create("datingapp2025-cec19");
        }

        [HttpPost]
        public async Task<IActionResult> CreateSocialMedia([FromBody] SocialMedia data)
        {
            DocumentReference socialNew = await _firestoreDb.Collection("socialMedia").AddAsync(data);

            data.Id = socialNew.Id;

            return Ok(data);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetSocialMediaByUserId(string userid)
        {
            Query queryMedia = _firestoreDb.Collection("socialMedia").WhereEqualTo("userId", userid);
            QuerySnapshot snapshotMedia = await queryMedia.GetSnapshotAsync();

            if (snapshotMedia.Count == 0)
                return NotFound();

            DocumentSnapshot doc = snapshotMedia.Documents.FirstOrDefault();

            if (doc == null || !doc.Exists)
                return NotFound();

            SocialMedia data = doc.ConvertTo<SocialMedia>();
            data.Id = doc.Id;

            

            return Ok(data);
        }
    }
}
