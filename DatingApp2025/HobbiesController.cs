using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using DatingApp2025.Models;

namespace DatingApp2025.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HobbiesController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public HobbiesController()
        {
            var pathToCredentials = Path.Combine(Directory.GetCurrentDirectory(), "firebase-config", "serviceAccountKey.json");
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", pathToCredentials);

            _firestoreDb = FirestoreDb.Create("datingapp2025-cec19"); 
        }

        [HttpGet]
        public async Task<IActionResult> GetHobbies()
        {
            List<Hobby> hobbies = new List<Hobby>();

            Query hobbiesQuery = _firestoreDb.Collection("hobbies");
            QuerySnapshot hobbiesSnapshot = await hobbiesQuery.GetSnapshotAsync();

            foreach (DocumentSnapshot document in hobbiesSnapshot.Documents)
            {
                if (document.Exists)
                {
                    Hobby hobby = document.ConvertTo<Hobby>();
                    hobby.Id = document.Id; 
                    hobbies.Add(hobby);
                }
            }
            return Ok(hobbies);
        }

    }
}
