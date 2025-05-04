using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using DatingApp2025.Models;

namespace DatingApp2025.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OccupationsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public OccupationsController()
        {
            var pathToCredentials = Path.Combine(Directory.GetCurrentDirectory(), "firebase-config", "serviceAccountKey.json");
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", pathToCredentials);

            _firestoreDb = FirestoreDb.Create("datingapp2025-cec19");
        }

        [HttpGet]
        public async Task<IActionResult> GetOccupation()
        {
            List<Occupation> occupations = new List<Occupation>();

            Query occupationsQuery = _firestoreDb.Collection("occupations");
            QuerySnapshot occupationsSnapshot = await occupationsQuery.GetSnapshotAsync();

            foreach (DocumentSnapshot docOccupaiton in occupationsSnapshot.Documents)
            {
                if (docOccupaiton.Exists)
                {
                    Occupation occupation = docOccupaiton.ConvertTo<Occupation>();
                    occupation.Id = docOccupaiton.Id;
                    occupations.Add(occupation);
                }
            }
            return Ok(occupations);
        }
    }
}
